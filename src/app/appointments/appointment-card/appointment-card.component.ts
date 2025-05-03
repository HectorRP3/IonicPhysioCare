import { Component, inject, input, OnInit, output } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
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
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
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
  ],
})
export class AppointmentCardComponent {
  appointment = input.required<Appointment>();
  // deleted = output<void>();
  #alertController = inject(AlertController);
  #toastCtrl = inject(ToastController);
  #navCtrl = inject(NavController);
  #actionSheetController = inject(ActionSheetController);
  #appointmentService = inject(AppointmentService);
  rol = input.required<string>();

  async showAction() {
    const actionSheet = await this.#actionSheetController.create({
      header: 'To do',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteEvent();
          },
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.#navCtrl.navigateRoot([
              '/events',
              this.appointment()._id,
              'edit',
            ]);
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

  async deleteEvent() {
    const alert = await this.#alertController.create({
      header: 'Are you sure?',
      subHeader: 'The event will be removed',
      buttons: ['I want to delete it', 'Cancel'],
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    if (result.role !== 'cancel') {
      // this.#eventsService.deleteEvent(this.event().id)
      // .subscribe({
      //   next: () => {
      //     this.deleted.emit();
      //     this.showToast("The event has been removed!")
      //   },
      //   error: () => this.showToast("The event could not be removed at this moment")
      // })
    }
  }

  async showToast(message: string) {
    const toast = await this.#toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
