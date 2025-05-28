import {
  afterNextRender,
  afterRenderEffect,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Appointment } from '../interfaces/appointment';
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
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { Physio } from 'src/app/physio/interfaces/physio';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PhysioService } from 'src/app/physio/services/physio.service';
import { map, tap } from 'rxjs';
import { PhysioSelectionComponent } from 'src/app/shared/modal/physio-selection/physio-selection.component';
import { AppointmentEditComponent } from '../modal/appointment-edit/appointment-edit.component';
import { Patient } from 'src/app/patient/interfaces/patient';
import { PatientService } from 'src/app/patient/services/patient.service';

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
    IonImg,
  ],
})
export class AppointmentCardComponent {
  appointment = input.required<Appointment>();
  #alertController = inject(AlertController);
  #toastCtrl = inject(ToastController);
  #navCtrl = inject(NavController);
  #actionSheetController = inject(ActionSheetController);
  #appointmentService = inject(AppointmentService);
  rol = input.required<string>();
  #authService = inject(AuthService);
  #physioService = inject(PhysioService);
  physio = signal<Physio | null>(null);
  token: string | null = '';
  deleted = output<void>();
  update = output<Appointment>();
  #modalCtrl = inject(ModalController);
  #patientService = inject(PatientService);
  patient = signal<Patient | undefined>(undefined);

  constructor() {
    afterNextRender(() => {
      this.initTokenAndRole();
    });
  }

  private async initTokenAndRole() {
    this.token = await this.getToken();
    if (this.token) {
      const role = this.#authService.decodeToken(this.token).rol;
      console.log('Rol decodificado:', role);

      if (role === 'physio') {
        console.log('patient');
        this.#patientService
          .getPatientById(this.appointment().patient!)
          .subscribe((res) => {
            console.log(res);
            this.patient.update(() => {
              return res;
            });
          });
      } else {
        console.log('physio');
        this.#physioService
          .getPhysioById(this.appointment().physio!)
          .subscribe((res) => {
            console.log(res.resultado);
            this.physio.update(() => {
              return res.resultado;
            });
          });
      }
    }
  }
  async getToken() {
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado:', token);
    return token;
  }

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
            this.openModal();
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
      subHeader: 'The appointment will be removed',
      buttons: ['I want to delete it', 'Cancel'],
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    if (result.role !== 'cancel') {
      this.#appointmentService
        .deleteAppointment(this.appointment()._id)
        .subscribe({
          next: () => {
            this.showToast('The physio has been removed!', 'success');
            this.deleted.emit();
          },
          error: () =>
            this.showToast(
              'The physio could not be removed at this moment',
              'danger'
            ),
        });
    }
  }

  async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.#toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      color: color,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }

  async openModal() {
    console.log(this.appointment());
    const modal = await this.#modalCtrl.create({
      component: AppointmentEditComponent,
      componentProps: {
        date: this.appointment().date,
        physioId: this.appointment().physio,
        patientId: this.appointment().patient,
        status: this.appointment().status,
        treatment: this.appointment().treatment,
        diagnosis: this.appointment().diagnosis,
        observations: this.appointment().observations,
        appointmentId: this.appointment()._id,
      },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.appointment) {
      console.log('Physio selected:', result.data.appointment);
      this.#appointmentService
        .updateAppointment(result.data.appointment)
        .subscribe({
          next: (response) => {
            console.log('Appointment updated successfully:', response);
            this.showToast('Appointment updated successfully!', 'success');
            this.update.emit(result.data.appointment);
          },
          error: (error) => {
            console.error('Error updating appointment:', error);
          },
        });
    }
  }
}
