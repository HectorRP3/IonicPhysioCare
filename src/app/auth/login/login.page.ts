import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  #platform = inject(Platform);
  firebaseToken?: string;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.email]], // CAMBIO
    password: ['', Validators.required],
  });

  constructor() {
    console.log(this.#platform.is('mobile'));
    // if (this.#platform.is('mobile')) {
    //   PushNotifications.register();

    //   // On success, we should be able to receive notifications
    //   PushNotifications.addListener('registration', (token: Token) => {
    //     this.firebaseToken = token.value;
    //   });
    // }
  }

  login() {
    const data = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password,
      firebaseToken: this.firebaseToken, // Agregar el token de Firebase
    };
    console.log('Datos enviados:', data);

    this.authService.login(data).subscribe({
      next: async (rol) => {
        console.log('Login correcto');
        console.log('Rol recibido directamente de la API:', rol);

        // Recuperar el token desde Preferences (no localStorage)
        const { value: token } = await Preferences.get({ key: 'fs-token' });
        console.log('Token guardado:', token);
        if (token) {
          const role = this.authService.decodeToken(token).rol;
          console.log('Rol decodificado:', role);

          if (role === 'admin') {
            this.router.navigate(['/patients']);
          } else {
            this.router.navigate(['/appointments']);
          }
        }
      },
      error: (err: any) => {
        console.error('Error en login:', err);
        alert('Login incorrecto. Verifica tus datos.');
      },
    });
  }
}
