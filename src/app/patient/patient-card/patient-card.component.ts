import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
  imports: [RouterLink,
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
    DatePipe,
  ],
})
export class PatientCardComponent  implements OnInit {
  patient = input.required<Patient>();
  #patientService =inject(PatientService);
  token: string | null = '';

  constructor() { }

  async ngOnInit() {
    // this.token = await this.getToken();
    // if(this.token) {
    //   this.#patientService.getPatients();
    // }
  }

  // async getToken() {
  //   const { value: token } = await Preferences.get({ key: 'fs-token' });
  //   console.log('Token usado en patient-card: ', token);
  //   return token;
  // }

}
