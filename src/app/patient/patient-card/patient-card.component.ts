import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ModalController,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonRouterLink,
  IonItem,
  IonLabel,
  IonAvatar,
  IonChip,
  IonBadge,
  AlertController,
  ToastController,
  IonImg,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonCardSubtitle,
  IonList,
  ActionSheetController,
  NavController,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
  imports: [
    RouterLink,
    IonRouterLink,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonItem,
    IonLabel,
    DatePipe,
    IonAvatar,
    IonChip,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonCardSubtitle,
    IonList,
    IonImg,
    DatePipe,
    IonThumbnail,
  ],
})
export class PatientCardComponent {
  patient = input.required<Patient>();
  #patientService = inject(PatientService);
  token: string | null = '';
  rol = input.required<string>();
  #actionSheetController = inject(ActionSheetController);
  deleted = output<void>();
  #toastCtrl = inject(ToastController);

  async showActionAdmin() {
    const actionSheet = await this.#actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.#patientService.deletePatient(this.patient()._id!).subscribe({
              next: async () => {
                const toast = await this.#toastCtrl.create({
                  message: 'Patient deleted successfully',
                  duration: 3000,
                  position: 'top',
                });
                await toast.present();
                this.deleted.emit();
              },
              error: async (err) => {
                const toast = await this.#toastCtrl.create({
                  message: `Error deleting patient: ${err.message}`,
                  duration: 3000,
                  position: 'top',
                });
                await toast.present();
              },
            });
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  constructor() {}

  // async getToken() {
  //   const { value: token } = await Preferences.get({ key: 'fs-token' });
  //   console.log('Token usado en patient-card: ', token);
  //   return token;
  // }
}
