import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular/standalone';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { Preferences } from '@capacitor/preferences';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonAvatar,
  IonImg,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  logIn,
  documentText,
  checkmarkCircle,
  images,
  camera,
  arrowUndoCircle,
  planet,
  eye,
  eyeOff,
  exit,
  add,
  trash,
  pencil,
  ellipsisHorizontal,
  people,
  search,
  compass,
  close,
  informationCircle,
  chatboxEllipses,
  navigate,
  thumbsUp,
  thumbsDown,
  person,
  logoGoogle,
  logoFacebook,
  map,
  card,
  golf,
  colorWand,
  clipboard,
  checkmark,
  happy,
  happyOutline,
  gitBranch,
  gitBranchOutline,
  gitMerge,
  gitMergeOutline,
  egg,
  calendarNumberOutline,
  homeOutline,
  idCardOutline,
  mailOutline,
  star,
  documentTextOutline,
  medkitOutline
} from 'ionicons/icons';
import { Patient } from './patient/interfaces/patient';
import { Physio } from './physio/interfaces/physio';
import { AuthService } from './auth/services/auth.service';
import { UserLogin } from './auth/interfaces/user';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonRouterLink,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonAvatar,
    IonImg,
    IonButton,
    IonIcon,
    IonMenuToggle,
    IonItem,
  ],
})
export class AppComponent {
  menuEnabled = false;
  public appPages = [
    //{ title: 'My profile', url: '/profile', icon: 'person' },
    { title: 'Appointments', url: '/appointments', icon: 'pencil' },
    { title: 'Physios', url: '/physios', icon: 'people' },
    { title: 'Patients', url: '/patients', icon: 'people' },
  ];
  user = signal<Patient | Physio | null>(null);
  #authService = inject(AuthService);
  #platform = inject(Platform);
  #nav = inject(NavController);
  isAdmin = computed(() => {
    if (this.#authService.rol() == 'admin') {
      return true;
    }
    return false;
  });


  isPhysio = computed(() => {
    if (this.#authService.rol() == 'physio') {
      return true;
    }
    return false;
  });

  
  firebaseToken: string | null = null;
  #toast = inject(ToastController);
  constructor() {
    addIcons({
      planet,
      home,
      logIn,
      documentText,
      checkmarkCircle,
      images,
      camera,
      arrowUndoCircle,
      eye,
      eyeOff,
      exit,
      add,
      trash,
      pencil,
      ellipsisHorizontal,
      people,
      search,
      compass,
      close,
      informationCircle,
      chatboxEllipses,
      navigate,
      thumbsUp,
      thumbsDown,
      person,
      logoGoogle,
      logoFacebook,
      map,
      card,
      golf,
      colorWand,
      clipboard,
      checkmark,
      happy,
      happyOutline,
      gitBranch,
      gitBranchOutline,
      gitMerge,
      gitMergeOutline,
      egg,
      calendarNumberOutline,
      homeOutline,
      idCardOutline,
      mailOutline,
      documentTextOutline,
      star,
      medkitOutline,
    });
    effect(() => {
      if (this.#authService.getLogged()) {
        this.#authService.getProfile().subscribe((user) => this.user.set(user));
      } else {
        this.user.set(null);
      }
    });
    this.initializeApp();
    this.checkToken();
  }
  async logout() {
    this.user.set(null);
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
  async checkToken() {
    const { value } = await Preferences.get({ key: 'token' });
    this.menuEnabled = !!value;
  }

  async initializeApp() {
    if (this.#platform.is('mobile') || this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();

      const res = await PushNotifications.checkPermissions();
      if (res.receive !== 'granted') {
        await PushNotifications.requestPermissions();
      }

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotificationSchema) => {
          const toast = await this.#toast.create({
            header: notification.title,
            message: notification.body,
            duration: 3000,
          });
          await toast.present();
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          if (notification.notification.data.appId) {
            this.#nav.navigateRoot([
              '/appointments',
              notification.notification.data.appId,
            ]);
          }
        }
      );
    }
  }
}
