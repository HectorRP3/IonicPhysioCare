import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  ToastController,
  ModalController,
  IonInput,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { PhysioService } from '../services/physio.service';
import { PhysioCardComponent } from '../physio-card/physio-card.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CropperComponent } from 'src/app/shared/modal/cropper/cropper.component';
import { Physio } from '../interfaces/physio';
import { Preferences } from '@capacitor/preferences';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'physio-detail',
  templateUrl: './physio-detail.component.html',
  styleUrls: ['./physio-detail.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonLabel,
    PhysioCardComponent,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonButton,

    IonInput,
  ],
})
export class PhysioDetailComponent {
  #physioService = inject(PhysioService);
  #authService = inject(AuthService);
  #router = inject(Router);
  id = input.required<string>();
  #navController = inject(NavController);
  #toastController = inject(ToastController);
  #changeDetector = inject(ChangeDetectorRef);
  #destroyRef = inject(DestroyRef);
  #modalCtrl = inject(ModalController);
  imageBase64: string | null = null;
  physio1 = signal<Physio | null>(null);
  isMyPhysio = signal<boolean>(false);
  valoracion = signal<number>(0);
  physio = rxResource({
    loader: () => this.#physioService.getPhysioById(this.id()),
  });
  rol = computed(() => {
    return this.#authService.rol();
  });

  constructor() {
    effect(async () => {
      const { value: idUser } = await Preferences.get({ key: 'fs-iduser' });
      const { value: token } = await Preferences.get({ key: 'fs-token' });
      console.log('Token guardado:', token);
      if (!token) {
        this.#navController.navigateRoot('/auth/login');
        this.isMyPhysio.set(false);
      }
      const id = this.#authService.decodeToken(token!).id;
      if (this.id() === id) {
        this.isMyPhysio.set(true);
      } else {
        this.isMyPhysio.set(false);
      }
    });
  }

  deletephysio() {
    this.#physioService.deletePhysio(this.id()).subscribe({
      next: () => {
        this.#router.navigate(['/physios']);
      },
      error: (err) => {
        console.error('Error deleting physio:', err);
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
    this.imageBase64 = photo.dataUrl as string;
    console.log('Photo taken:', this.imageBase64);
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
    this.imageBase64 = photo.dataUrl as string;
    console.log('Photo taken:', this.imageBase64);
    this.openModal();
  }

  async openModal() {
    const modal = await this.#modalCtrl.create({
      component: CropperComponent,
      componentProps: { imagenBase64: this.imageBase64 },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.avatar) {
      console.log('Imagen selected:', result.data.avatar);
      const newPhysio: Physio = {
        _id: this.id(),
        avatar: result.data.avatar,
        name: this.physio.value()?.resultado.name || '',
        email: this.physio.value()?.resultado.email || '',
        licenseNumber: this.physio.value()?.resultado.licenseNumber || '',
        surname: this.physio.value()?.resultado.surname || '',
        specialty: this.physio.value()?.resultado.specialty || '',
        starts: this.physio.value()?.resultado.starts || 1,
      };
      this.#physioService.updatePhysio(newPhysio!).subscribe({
        next: (response) => {
          console.log('Physio updated successfully:', response);
          this.#toastController
            .create({
              message: 'Physio updated successfully!',
              duration: 2000,
              position: 'top',
            })
            .then((toast) => toast.present());
          this.physio.reload();
          this.#changeDetector.detectChanges();
        },
        error: (error) => {
          console.error('Error updating physio:', error);
          this.#toastController
            .create({
              message: 'Error updating physio',
              duration: 2000,
              position: 'top',
            })
            .then((toast) => toast.present());
        },
      });
    }
  }

  valorar() {
    const valoracion = this.valoracion();
    if (valoracion < 1 || valoracion > 5) {
      this.#toastController
        .create({
          message: 'Valoración debe estar entre 1 y 5',
          duration: 2000,
          position: 'top',
        })
        .then((toast) => toast.present());
      return;
    }

    const newPhysio: Physio = {
      _id: this.id(),
      avatar: this.physio.value()?.resultado.avatar || '',
      name: this.physio.value()?.resultado.name || '',
      email: this.physio.value()?.resultado.email || '',
      licenseNumber: this.physio.value()?.resultado.licenseNumber || '',
      surname: this.physio.value()?.resultado.surname || '',
      specialty: this.physio.value()?.resultado.specialty || '',
      starts: valoracion,
    };
    console.log(newPhysio);
    this.#physioService.updatePhysio(newPhysio!).subscribe({
      next: (response) => {
        console.log('Physio updated successfully:', response);
        this.#toastController
          .create({
            message: 'Physio updated successfully!',
            duration: 2000,
            position: 'top',
          })
          .then((toast) => toast.present());
        this.physio.reload();
        this.#changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error updating physio:', error);
        this.#toastController
          .create({
            message: 'Error updating physio',
            duration: 2000,
            position: 'top',
          })
          .then((toast) => toast.present());
      },
    });
  }
}
