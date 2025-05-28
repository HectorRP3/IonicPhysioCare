import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonRefresherContent, IonRefresher, IonFabButton, IonFab,
  IonButtons, IonMenuButton,
 } from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonMenuButton, IonButtons, IonIcon, IonFab, IonFabButton, IonRefresherContent, IonRefresher, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PatientCardComponent]
})
export class HomePage {
  patients = signal<Patient[]>([]);
  #patientService = inject(PatientService);
  role = '';
  #router = inject(Router);


  constructor() { }

  ionViewWillEnter() {
    this.reloadPatients();
  }

  reloadPatients(refresher?: IonRefresher) {
    this.#patientService.getPatients()
      .subscribe((patients) => {
        this.patients.set(patients);
        console.log('Patients reloaded:', this.patients());
      });

    refresher?.complete();
  }

  createPatient() {
    this.#router.navigate(['/patients/add'], {
        //queryParams: { physioId: result.data.physio },
    });
  }

}
