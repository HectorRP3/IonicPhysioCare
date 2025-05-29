import { Component, inject, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import {
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonLabel,
    ImageCropperComponent,
  ],
})
export class CropperComponent {
  #alertController = inject(AlertController);
  #modalController = inject(ModalController);

  imagenBase64 = '';
  aspectRatio = 16 / 9;
  croppedImage: string = '';

  constructor() {
    console.log(this.imagenBase64);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 || '';
  }

  choosedPhysio() {
    console.log('Selected Image:', this.imagenBase64);
    console.log('Cropped Image:', this.croppedImage);
    this.#modalController.dismiss({ avatar: this.croppedImage });
  }

  close() {
    this.#modalController.dismiss();
  }
}
