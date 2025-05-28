import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PatientCardComponent]
})
export class HomePage {
  patients = signal<Patient[]>([]);
  #patientService = inject(PatientService);

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

}
