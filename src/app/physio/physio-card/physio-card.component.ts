import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
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
} from '@ionic/angular/standalone';
import { Physio } from '../interfaces/physio';
import { PhysioService } from '../services/physio.service';
@Component({
  selector: 'physio-card',
  templateUrl: './physio-card.component.html',
  styleUrls: ['./physio-card.component.scss'],
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

    IonChip,
    IonImg,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonList,
  ],
})
export class PhysioCardComponent {
  physio = input.required<Physio>();
  rol = input.required<string>();
  #actionSheetController = inject(ActionSheetController);
  #physioService = inject(PhysioService);
  #toastCtrl = inject(ToastController);
  deleted = output<void>();
  #router = inject(Router);

  async showActionAdmind() {
    const actionSheet = await this.#actionSheetController.create({
      header: 'To do',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.#physioService.deletePhysio(this.physio()._id!).subscribe({
              next: async () => {
                const toast = await this.#toastCtrl.create({
                  message: 'Physio deleted successfully',
                  duration: 2000,
                  position: 'top',
                });
                await toast.present();
                this.deleted.emit();
              },
              error: async (err) => {
                const toast = await this.#toastCtrl.create({
                  message: `Error deleting physio: ${err.message}`,
                  duration: 2000,
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

  async showActionPatient() {
    const actionSheet = await this.#actionSheetController.create({
      header: 'To do',
      buttons: [
        {
          text: 'Request Appointment',
          role: 'select',
          icon: 'planet',
          handler: () => {
            this.#router.navigate(['/appointments/add'], {
              queryParams: { physioId: this.physio()._id },
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
}
