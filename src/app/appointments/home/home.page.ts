import { Component, inject, OnInit, signal } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { map } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component';
import { PhysioSelectionComponent } from 'src/app/shared/modal/physio-selection/physio-selection.component';

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
  #modalCtrl = inject(ModalController);
  name = '';
  #toastCtrl = inject(ToastController);
  #router = inject(Router);

  ionViewWillEnter() {
    this.reloadAppointments();
  }
  async reloadAppointments(refresher?: IonRefresher) {
    this.appointments.set([]);
    const { value: idUser } = await Preferences.get({ key: 'fs-iduser' });
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado:', token);
    if (!token) {
      // SACAR MENSAJE DE ALERT Y REDIRIGIR AL LOGIN
      return;
    }
    this.role = this.#authService.decodeToken(token).rol;
    this.name = this.#authService.decodeToken(token).login;
    console.log('Rol decodificado:', this.role);
    if (this.role == 'patient') {
      this.#appointmentService
        .getAppointmentsPatient(idUser!.toString(), this.order())
        .subscribe((app) => {
          if (app.resultado.length === 0) {
            this.showToast(
              'No appointments found. Please create a new appointment.'
            );
          } else {
            console.log(app.resultado);
            this.appointments.set(app.resultado);
          }

          refresher?.complete();
        });
    } else {
      this.#appointmentService
        .getAppointmentsPhysio(idUser!.toString(), this.order())
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
      if (result.data.values === 'future') {
        this.order.set('future');
      }
      if (result.data.values === 'past') {
        this.order.set('past');
      }
      this.reloadAppointments();
    }
  }

  deleteAppointment(appointment: Appointment) {
    this.appointments.update((appointments) =>
      appointments.filter((a) => a._id !== appointment._id)
    );
  }

  async openModal() {
    const modal = await this.#modalCtrl.create({
      component: PhysioSelectionComponent,
      componentProps: { name: this.name },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.physio) {
      console.log('Physio selected:', result.data.physio);
      // this.#navController.navigateForward('/appointments/add', {
      //   queryParams: { physioId: result.data.physio },
      // });
      this.#router.navigate(['/appointments/add'], {
        queryParams: { physioId: result.data.physio },
      });
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
