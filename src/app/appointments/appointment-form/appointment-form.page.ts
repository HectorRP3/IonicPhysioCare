import {
  afterNextRender,
  afterRender,
  afterRenderEffect,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ToastController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { AppointmentInsert } from '../interfaces/appointment';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'appointment-form',
  templateUrl: './appointment-form.page.html',
  styleUrls: ['./appointment-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
    JsonPipe,
  ],
})
export class AppointmentFormPage {
  #appointmentService = inject(AppointmentService);
  physioId = input<string>();
  token: string = '';
  #authService = inject(AuthService);
  recordId: string = '';
  #fb = inject(NonNullableFormBuilder);
  appointmentForm = this.#fb.group({
    date: ['', Validators.required],
  });

  constructor() {
    afterRenderEffect(() => {
      this.getRecordId();
    });
  }

  addAppointment() {
    const newAppointment: AppointmentInsert = {
      ...this.appointmentForm.getRawValue(),
      physio: this.physioId(),
    };
    console.log('New Appointment:', newAppointment);
    console.log('Record ID:', this.recordId);
    console.log('physioId:', this.physioId());
    this.#appointmentService
      .createAppointment(newAppointment, this.recordId)
      .subscribe({
        next: (response) => {
          console.log('Appointment created successfully:', response);
          this.appointmentForm.reset();
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
        },
      });
  }

  async getRecordId() {
    this.token = (await this.getToken()) ?? '';
    if (this.token) {
      const role = this.#authService.decodeToken(this.token).rol;
      const idPatient = this.#authService.decodeToken(this.token).id;
      console.log('Rol decodificado:', role);

      if (role === 'patient') {
        console.log('patient');
        this.#appointmentService.getRecordByIdPatient(idPatient).subscribe({
          next: (response) => {
            console.log('Record ID for patient:', response);
            this.recordId = response.resultado._id;
          },
          error: (error) => {
            console.error('Error fetching record ID for patient:', error);
          },
        });
      }
    }
  }
  async getToken() {
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado:', token);
    return token;
  }
}
