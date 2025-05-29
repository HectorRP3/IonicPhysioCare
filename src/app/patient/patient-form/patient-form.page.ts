import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmailValidator,
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NavController,
  IonLabel,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonList,
  IonIcon,
  IonInput,
  ToastController,
  IonDatetime,
  ModalController,
  IonImg,
} from '@ionic/angular/standalone';
import { PatientService } from '../services/patient.service';
import { ValueEqualsDirective } from 'src/app/shared/directives/value-equals.directive';
import { add } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PatientInsert } from '../interfaces/patient';
import { Geolocation } from '@capacitor/geolocation';
import { CropperComponent } from 'src/app/shared/modal/cropper/cropper.component';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.page.html',
  styleUrls: ['./patient-form.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonInput,
    IonIcon,
    IonList,
    FormsModule,
    ReactiveFormsModule,
    IonLabel,
    IonItem,
    IonButton,
    IonMenuButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ValueEqualsDirective,
    IonDatetime,
  ],
})
export class PatientFormPage {
  #patientService = inject(PatientService);
  mensaje = '';
  #changeDetector = inject(ChangeDetectorRef);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);
  imagenBase64: string | null = null;
  #modalCtrl = inject(ModalController);

  #fb = inject(NonNullableFormBuilder);

  newPatient: PatientInsert = {
    name: '',
    surname: '',
    birthDate: '',
    address: '',
    insuranceNumber: '',
    email: '',
    password: '',
    avatar: '',
    lat: 0,
    lng: 0,
  };

  patientForm = this.#fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    insuranceNumber: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', [Validators.required, Validators.email]],

    birthDate: ['', [Validators.required]],

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password2: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    avatar: [''],
  });
  constructor() {
    this.getLocation();
  }

  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    this.newPatient.lat = coordinates.coords.latitude;
    this.newPatient.lng = coordinates.coords.longitude;
  }

  addPatient() {
    this.newPatient.name = this.patientForm.get('name')?.getRawValue();
    this.newPatient.surname = this.patientForm.get('surname')?.getRawValue();
    this.newPatient.birthDate = this.patientForm
      .get('birthDate')
      ?.getRawValue();
    this.newPatient.address = this.patientForm.get('address')?.getRawValue();
    this.newPatient.insuranceNumber = this.patientForm
      .get('insuranceNumber')
      ?.getRawValue();
    this.newPatient.email = this.patientForm.get('email')?.getRawValue();
    this.newPatient.password = this.patientForm.get('password')?.getRawValue();
    this.newPatient.avatar = this.patientForm.get('avatar')?.getRawValue();

    this.#patientService.createPatient(this.newPatient).subscribe(async () => {
      (
        await this.#toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'Patient inserted!',
        })
      ).present();
      this.#nav.navigateRoot(['/patients']);
    });
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });
    this.imagenBase64 = photo.dataUrl as string;
    console.log('Photo taken:', this.imagenBase64);
    this.openModal();
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });
    this.imagenBase64 = photo.dataUrl as string;
    console.log('Photo taken:', this.imagenBase64);
    this.openModal();
  }

  async openModal() {
    const modal = await this.#modalCtrl.create({
      component: CropperComponent,
      componentProps: { imagenBase64: this.imagenBase64 },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.avatar) {
      console.log('Imagen selected:', result.data.avatar);
      this.patientForm.get('avatar')?.setValue(result.data.avatar);
      this.#changeDetector.markForCheck();
    }
  }
}
