import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonCol,
  IonRow,
  ToastController,
  IonGrid,
  NavController,
  ActionSheetController,
  AlertController,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { Phsyio } from '../interfaces/physio';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { PhysioService } from '../services/physio.service';
@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonSearchbar,
    IonList,
  ],
})
export class HomePage {
  #authService = inject(AuthService);
  #physioService = inject(PhysioService); // Assuming you have a PhysioService similar to AuthService
  #navController = inject(NavController);
  #actionSheetCtrl = inject(ActionSheetController);
  #alertCtrl = inject(AlertController);
  physios = signal<Phsyio[]>([]);
  role = '';
  #modalCtrl = inject(ModalController);
  name = '';
  #toastCtrl = inject(ToastController);
  #router = inject(Router);
  search = '';
  ionViewWillEnter() {
    this.reloadPhysios();
  }
  async reloadPhysios(refresher?: IonRefresher) {
    this.physios.set([]);
    const { value: idUser } = await Preferences.get({ key: 'fs-iduser' });
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado:', token);
    if (!token) {
      // TODO SACAR MENSAJE DE ALERT Y REDIRIGIR AL LOGIN
      return;
    }
    refresher?.complete();
    this.role = this.#authService.decodeToken(token).rol;
    this.name = this.#authService.decodeToken(token).login;
    console.log('Rol decodificado:', this.role);
    this.#physioService.getPhysios(this.search).subscribe({
      next: (res) => {
        this.physios.set(res.resultado);
        console.log('Physios obtenidos:', res.resultado);
      },
      error: (err) => {
        console.error('Error al obtener los fisios:', err);
        this.#toastCtrl
          .create({
            message: 'Error al cargar los fisios',
            duration: 2000,
            position: 'bottom',
          })
          .then((toast) => toast.present());
      },
    });
  }
  toAddForm() {
    this.#navController.navigateForward('/physios/add');
  }
}
