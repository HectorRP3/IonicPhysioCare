import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
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
  IonImg,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonCardSubtitle,
  IonList, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ProfilePage } from '../profile.page';
import { rxResource } from '@angular/core/rxjs-interop';
import { PatientService } from 'src/app/patient/services/patient.service';
import { Appointment } from 'src/app/appointments/interfaces/appointment';
import { AppointmentCardComponent } from 'src/app/appointments/appointment-card/appointment-card.component';

@Component({
  selector: 'profile-record',
  templateUrl: './profile-record.page.html',
  styleUrls: ['./profile-record.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, AppointmentCardComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRouterLink, IonItem, IonLabel, IonAvatar, IonChip, IonBadge, IonImg, IonButton, IonGrid, IonCol, IonRow, IonCardSubtitle, IonList]
})
export class ProfileRecordPage {

  patient = inject(ProfilePage).patient;
  #patientService = inject(PatientService);
  role = ''; // para logica de borrado y edición de citas

  id = inject(ProfilePage).id;
  recordResource = rxResource({
      request: () => this.id(),
      loader: ({ request: id }) => this.#patientService.getRecordById(id!)
  });
  record = computed(() => this.recordResource.value());

  ionViewWillEnter() {
    this.reloadAppointments();
  }

  // apointments
  appointments = signal<Appointment[]>([]);

  async reloadAppointments(refresher?: IonRefresher) {
    this.appointments.set(this.recordResource.value()?.appointments ?? []);
    refresher?.complete();
  } 

  constructor() { 
    this.reloadAppointments();
  }

}
