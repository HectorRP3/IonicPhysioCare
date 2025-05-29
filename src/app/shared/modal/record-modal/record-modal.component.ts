import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonListHeader,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonRadio,
  IonSpinner,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonRadioGroup,
    IonLabel,
    IonItem,
    IonRadio,
    IonSpinner,
    IonInput
  ],
})
export class RecordModalComponent {
  medicalRecord: string = '';
  #modalCtrl = inject(ModalController);
  
  chooseMedicalRecord() {
    this.#modalCtrl.dismiss({
      medicalRecord: this.medicalRecord,
    });
  }

  close() {
    this.#modalCtrl.dismiss();
  }

}
