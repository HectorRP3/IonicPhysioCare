import { Component, computed, effect, inject, input, numberAttribute, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ModalController,
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
  IonTabs, IonTabButton, IonTabBar } from '@ionic/angular/standalone';
import { Patient } from 'src/app/patient/interfaces/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProfilePage } from '../profile.page';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonToolbar, IonTabButton, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRouterLink, IonItem, IonLabel, IonAvatar, IonChip, IonBadge, IonImg, IonButton, IonGrid, IonCol, IonRow, IonCardSubtitle, IonList,]
})
export class ProfileInfoPage {
  patient = inject(ProfilePage).patient;
  #actionSheetController = inject(ActionSheetController);
  #patientService = inject(PatientService);
  #toastCtrl = inject(ToastController);
  deleted = output<void>();
  #authService = inject(AuthService);
  role = '';
  rol = computed(() => this.role);
  #navCtrl = inject(NavController);

  async showActionAdmin() {
    const actionSheet = await this.#actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.#patientService.deletePatient(this.patient()!._id!).subscribe({
              next: async () => {
                const toast = await this.#toastCtrl.create({
                  message: 'Patient deleted successfully',
                  duration: 3000,
                  position: 'top',
                });
                await toast.present();
                this.deleted.emit();
                this.#navCtrl.navigateRoot(['/patients']);
              },
              error: async (err) => {
                const toast = await this.#toastCtrl.create({
                  message: `Error deleting patient: ${err.message}`,
                  duration: 3000,
                  position: 'top',
                });
                await toast.present();
              },
            });
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  constructor() {
      effect(async () => {
          const { value: token } = await Preferences.get({ key: 'fs-token' });
          console.log('Token guardado en home de patient:', token);
          if (!token) {
            // en caso de que no haya token, redirige al login
            inject(NavController).navigateRoot(['/auth/login']);
            return;
          }

          this.role = this.#authService.decodeToken(token).rol;

          console.log('Rol decodificado en profileInfoPatient:', this.role);
      });
   }

}
