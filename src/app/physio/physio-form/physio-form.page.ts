import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ToastController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonDatetime,
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { sameValue } from 'src/app/shared/validators/same-value.validators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhsyioInsert } from '../interfaces/physio';
import { PhysioService } from '../services/physio.service';

@Component({
  selector: 'physio-form',
  templateUrl: './physio-form.page.html',
  styleUrls: ['./physio-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonItem,
    IonButton,
    IonLabel,
    IonDatetime,
    IonList,
    IonIcon,
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
    IonImg,
    IonText,
    IonSelect,
    IonSelectOption,
  ],
})
export class PhysioFormPage {
  #fb = inject(NonNullableFormBuilder);
  #navController = inject(NavController);
  #toastController = inject(ToastController);
  #changeDetector = inject(ChangeDetectorRef);
  #destroyRef = inject(DestroyRef);
  #physioService = inject(PhysioService);
  passwordControl = this.#fb.control('', {
    validators: [Validators.required],
  });

  physioForm = this.#fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    licenseNumber: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8}$')],
    ],
    specialty: ['', [Validators.required]],
    password: this.passwordControl,
    password2: ['', sameValue(this.passwordControl)],
    avatar: [''],
  });
  constructor() {
    this.passwordControl.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.physioForm.controls.password2.updateValueAndValidity();
      });
  }
  createPhysio() {
    const newPhysio: PhsyioInsert = {
      ...this.physioForm.getRawValue(),
      avatar: this.physioForm.get('avatar')?.value || '',
    };
    console.log('Nuevo fisio:', newPhysio);
    this.#physioService.createPhysio(newPhysio).subscribe({
      next: (response) => {
        console.log('Fisio creado:', response);
        this.#toastController
          .create({
            message: 'Physio created successfully',
            duration: 2000,
            position: 'top',
          })
          .then((toast) => toast.present());
        this.#navController.back();
      },
      error: (error) => {
        console.error('Error creating physio:', error);
        this.#toastController
          .create({
            message: 'Error creating physio',
            duration: 2000,
            position: 'top',
          })
          .then((toast) => toast.present());
      },
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

    this.physioForm.get('avatar')?.setValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 400,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });
    this.physioForm.get('avatar')?.setValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }

  cancel() {
    this.#navController.back();
  }
}
