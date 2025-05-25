import { Component, inject, input, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';

import { rxResource } from '@angular/core/rxjs-interop';
import { PhysioService } from 'src/app/physio/services/physio.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'physio-selection',
  templateUrl: './physio-selection.component.html',
  styleUrls: ['./physio-selection.component.scss'],
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
  ],
})
export class PhysioSelectionComponent {
  name = '';
  #modalCtrl = inject(ModalController);
  #physioService = inject(PhysioService);
  physioid = '';

  physiosList = rxResource({
    loader: () => this.#physioService.getPhysios(),
  });

  choosedPhysio() {
    this.#modalCtrl.dismiss({ physio: this.physioid });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
