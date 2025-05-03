import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
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
  IonGrid,
  NavController,
  ActionSheetController,
  AlertController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { map } from 'rxjs';

@Component({
  selector: 'home-appointment',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
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
    IonGrid,
  ],
})
export class HomePage {
  #appointmentService = inject(AppointmentService);
  #navController = inject(NavController);
  #actionSheetCtrl = inject(ActionSheetController);
  #alertCtrl = inject(AlertController);
  order = signal('future');

  ionViewWillEnter() {
    this.reloadAppointments();
  }
  reloadAppointments(refresher?: IonRefresher) {
    this.#appointmentService
      .getAppointmentsPhysio('67f3fe3996b49b1892b182e4')
      .subscribe((app) => {
        console.log(app.resultado);
        refresher?.complete();
      });
  }

  constructor() {
    this.reloadAppointments();
  }

  async showFilters() {
    const alert = await this.#alertCtrl.create({
      header: 'Choose order by',
      inputs: [
        {
          label: 'Future',
          type: 'radio',
          value: 'future',
          checked: this.order() == 'future',
        },
        {
          label: 'Past',
          type: 'radio',
          value: 'past',
          checked: this.order() == 'past',
        },
      ],
      buttons: ['Filter', 'Cancel'],
    });
    await alert.present();

    const result = await alert.onDidDismiss();
    if (result.data && result.role !== 'cancel') {
      this.order.set(result.data.values);
      this.reloadAppointments();
    }
  }

  async showOptionsAppointment() {
    //(APPOINTEMNT : APPOINTMENT)
    const actSheet = await this.#actionSheetCtrl.create({
      header: 'apppointment.description',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // this.#productsService
            //   .deleteProduct(prod.id!)
            //   .subscribe(() =>
            //     this.products.update(prods => prods.filter(p => p !== prod))
            //   );
          },
        },
        {
          text: 'See details',
          icon: 'eye',
          handler: () => {
            // this.#navController.navigateForward(['/products', prod.id]);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    actSheet.present();
  }
}
