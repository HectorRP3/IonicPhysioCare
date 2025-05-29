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
  IonList, IonRefresher, IonRefresherContent, IonFabButton, IonFab, ModalController } from '@ionic/angular/standalone';
import { ProfilePage } from '../profile.page';
import { rxResource } from '@angular/core/rxjs-interop';
import { PatientService } from 'src/app/patient/services/patient.service';
import { Appointment } from 'src/app/appointments/interfaces/appointment';
import { AppointmentCardComponent } from 'src/app/appointments/appointment-card/appointment-card.component';
import { map } from 'rxjs';
import { PhysioSelectionComponent } from 'src/app/shared/modal/physio-selection/physio-selection.component';
import { Router } from '@angular/router';
import { RecordModalComponent } from 'src/app/shared/modal/record-modal/record-modal.component';
import { Record, RecordInsert } from 'src/app/patient/interfaces/patient';

@Component({
  selector: 'profile-record',
  templateUrl: './profile-record.page.html',
  styleUrls: ['./profile-record.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonRefresherContent, IonRefresher, AppointmentCardComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRouterLink, IonItem, IonLabel, IonAvatar, IonChip, IonBadge, IonImg, IonButton, IonGrid, IonCol, IonRow, IonCardSubtitle, IonList]
})
export class ProfileRecordPage {

  patient = inject(ProfilePage).patient;
  #patientService = inject(PatientService);
  role = ''; // para logica de borrado y edición de citas

  #modalCtrl = inject(ModalController);
  #router = inject(Router);

  id = inject(ProfilePage).id;
  recordResource = rxResource({
      request: () => this.id(),
      loader: ({ request: id }) => this.#patientService.getRecordById(id!).pipe(
        map((record) => {
          this.appointments.set(record.appointments ?? []);
          return record;
        })
      )
  });
  record = computed(() => this.recordResource.value());

  ionViewWillEnter() {
    this.reloadAppointments();
  }

  // apointments
  appointments = signal<Appointment[]>([]);

  async reloadAppointments(refresher?: IonRefresher) {
    const today = new Date();
    const sortedAppointments = (this.recordResource.value()?.appointments ?? [])
      .filter(app => !!app.date && new Date(app.date) < today)
      .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());
    this.appointments.set(sortedAppointments);
    refresher?.complete();
  } 



  async openModal() {
      const modal = await this.#modalCtrl.create({
        component: RecordModalComponent,
        componentProps: { medicalRecord: this.record()?.medicalRecord },
      });
      await modal.present();
      const result = await modal.onDidDismiss();
      if (result.data && result.data.medicalRecord) {

        console.log('Medical selected:', result.data.medicalRecord);

        const updatedRecord: RecordInsert = {
          _id: this.record()!._id,
          patient: this.record()!.patient._id,
          medicalRecord: result.data.medicalRecord,
          appointments: this.record()?.appointments ?? []
        };

        this.#patientService.updateRecord(updatedRecord).subscribe({
          next: (record) => {
            console.log('Record updated:', record);
            this.recordResource.reload();
          },
          error: (err) => {
            console.error('Error updating record:', err);
          }
        });

        // this.#router.navigate(['/appointments/add'], {
        //   queryParams: { physioId: result.data.physio },
        // });

      }
  }

  
}
