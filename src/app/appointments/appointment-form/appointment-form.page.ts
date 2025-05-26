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
import { LocalNotifications } from '@capacitor/local-notifications';
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
  IonDatetime,
} from '@ionic/angular/standalone';
import { Appointment, AppointmentInsert } from '../interfaces/appointment';
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
    IonItem,
    IonButton,
    IonLabel,
    IonDatetime,
  ],
})
export class AppointmentFormPage {
  #appointmentService = inject(AppointmentService);
  physioId = input<string>();
  token: string = '';
  #authService = inject(AuthService);
  recordId: string = '';
  #fb = inject(NonNullableFormBuilder);
  todayIso = new Date().toISOString().split('T')[0];
  mensaje = '';
  appointmentForm = this.#fb.group({
    date: ['', [Validators.required]],
  });
  #navController = inject(NavController);
  idPatient: string = '';
  new: any;
  constructor() {
    afterRenderEffect(() => {
      this.getRecordId();
    });
  }

  addAppointment() {
    const newAppointment: AppointmentInsert = {
      ...this.appointmentForm.getRawValue(),
      physio: this.physioId(),
      patient: this.idPatient,
    };
    console.log('New Appointment:', newAppointment);
    console.log('Record ID:', this.recordId);
    console.log('physioId:', this.physioId());
    if (this.appointmentForm.get('date')?.value === '') {
      console.error('La fecha es obligatoria');
      return;
    }
    const dateValue = this.appointmentForm.get('date')?.value;
    if (dateValue !== undefined && dateValue < this.todayIso) {
      console.error('La fecha no puede ser anterior a hoy');
      this.mensaje = 'La fecha no puede ser anterior a hoy';
      return;
    }

    this.#appointmentService
      .createAppointment(newAppointment, this.recordId)
      .subscribe({
        next: (response) => {
          console.log('Appointment created successfully:', response);
          this.createNotification(newAppointment);
          this.#navController.navigateBack('/appointments');
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
      this.idPatient = this.#authService.decodeToken(this.token).id;
      console.log('Rol decodificado:', role);

      if (role === 'patient') {
        console.log('patient');
        this.#appointmentService
          .getRecordByIdPatient(this.idPatient)
          .subscribe({
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

  async createNotification(appointment: AppointmentInsert) {
    const permissionStatus = await LocalNotifications.requestPermissions();
    if (permissionStatus.display !== 'granted') {
      console.warn('Permiso de notificaciones denegado');
      return;
    }

    const citaAppointmentDate = new Date(appointment.date!);
    const menoUnaHora = new Date(
      citaAppointmentDate.getTime() - 60 * 60 * 1000
    );
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 1000000), // Genera un ID aleatorio
          title: 'Recordatorio de cita',
          body: `Tu cita es en 1 hora.`,
          schedule: { at: menoUnaHora },
          smallIcon: 'ic_stat_icon',
        },
      ],
    });

    console.log(
      `Notificación programada para las ${menoUnaHora.toLocaleString()}`
    );
  }
}
