import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
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
  IonImg,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonCardSubtitle,
  IonList,
  IonTabs,
  IonTabButton,
  IonTabBar,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { PatientService } from 'src/app/patient/services/patient.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonContent,

    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonRouterLink,
    IonItem,
    IonLabel,
    IonAvatar,
    IonChip,
    IonBadge,
    IonImg,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonCardSubtitle,
    IonList,
  ],
})
export class ProfilePage {
  #patientService = inject(PatientService);
  #authService = inject(AuthService);
  #navCtrl = inject(NavController);

  id = input.required<string>();
  patientResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.#patientService.getPatientById(id!),
  });
  patient = computed(() => this.patientResource.value());

  //isPhysio = computed(() => this.#authService.rol() === 'physio');          mirar para el caso de perfil Physio

  //TODO: para redirigir desde el menu con `My profile` tenemos q conseguir el id del usuario logueado y que segun el cargue el profile.page:

  // IonWillEnter() {
  //   effect(async () => {
  //         const { value: token } = await Preferences.get({ key: 'fs-iduser' });

  //         console.log('Token guardado en home de patient:', token);

  //         if (!token) {
  //           // en caso de que no haya token, redirige al login
  //           this.#navCtrl.navigateRoot(['/auth/login']);
  //           return;
  //         }

  //         this.id = await this.#authService.decodeToken(token).id;

  //         console.log('Id decodificado en profilePage:', this.id);
  //     });

  //   console.log('ProfilePage initialized with id:', this.id());
  // }
}
