import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonRefresherContent, IonRefresher, IonFabButton, IonFab,
  IonButtons, IonMenuButton, IonSearchbar,
 } from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonMenuButton, IonButtons, IonIcon, IonFab, IonFabButton, IonRefresherContent, IonRefresher, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PatientCardComponent]
})
export class HomePage {
  patients = signal<Patient[]>([]);
  #patientService = inject(PatientService);
  role = '';
  name = '';
  #router = inject(Router);
  #authService = inject(AuthService);
  search = '';


  constructor() { }

  ionViewWillEnter() {
    this.reloadPatients();
  }

  async reloadPatients(refresher?: IonRefresher) {

    const { value: idUser } = await Preferences.get({ key: 'fs-iduser' });
    const { value: token } = await Preferences.get({ key: 'fs-token' });
    console.log('Token guardado en home de patient:', token);

    if (!token) {
      // en caso de que no haya token, redirige al login
      this.#router.navigate(['/auth/login']);
      return;
    }
        refresher?.complete();
    this.role = this.#authService.decodeToken(token).rol;
    this.name = this.#authService.decodeToken(token).login;

    console.log('Rol decodificado en home de patient:', this.role);

    this.#patientService.getPatients(this.search)
      .subscribe({
        next: (patients) => {
          this.patients.set(patients.resultado);
          console.log('Patients reloaded:', this.patients());
        },
        error: (err) => {
          console.error('Error loading patients:', err);
        }
      }
      //   (patients) => {
      //   this.patients.set(patients.resultado);
      //   console.log('Patients reloaded:', this.patients());
      // }
    );

    refresher?.complete();
  }

  createPatient() {
    this.#router.navigate(['/patients/add'], {
    });
  }

  deletePatient(patientId: string) {
    this.patients.update((currentPatients) =>
      currentPatients.filter((patient) => patient._id !== patientId)
    );
  }

}
