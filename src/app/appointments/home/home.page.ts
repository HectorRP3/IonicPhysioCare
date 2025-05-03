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
import { Appointment } from '../interfaces/appointment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component';

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
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    AppointmentCardComponent,
  ],
})
export class HomePage {
  #authService = inject(AuthService);
  #appointmentService = inject(AppointmentService);
  #navController = inject(NavController);
  #actionSheetCtrl = inject(ActionSheetController);
  #alertCtrl = inject(AlertController);
  order = signal('future');
  appointments = signal<Appointment[]>([]);
  role = '';

  ionViewWillEnter() {
    this.reloadAppointments();
  }
  async reloadAppointments(refresher?: IonRefresher) {
    const { value: idUser } = await Preferences.get({ key: 'fs-iduser' });
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado:', token);
    if (!token) {
      // SACAR MENSAJE DE ALERT Y REDIRIGIR AL LOGIN
      return;
    }
    this.role = this.#authService.decodeToken(token).rol;
    console.log('Rol decodificado:', this.role);
    if (this.role == 'patient') {
      this.#appointmentService
        .getAppointmentsPatient(idUser!.toString())
        .subscribe((app) => {
          console.log(app.resultado);
          this.appointments.set(app.resultado);
          refresher?.complete();
        });
    } else {
      this.#appointmentService
        .getAppointmentsPhysio(idUser!.toString())
        .subscribe((app) => {
          console.log(app.resultado);
          this.appointments.set(app.resultado);
          refresher?.complete();
        });
    }
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
