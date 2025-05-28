import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
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
} from 'ionicons/icons';

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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonListHeader,
    IonNote,
    IonIcon,
    IonMenuToggle,
    IonItem,
  ],
})
export class AppComponent {
  menuEnabled = false;
  public appPages = [
    { title: 'Appointments', url: '/appointments', icon: 'pencil' },
    { title: 'Physios', url: '/physios', icon: 'people' },
    { title: 'Patients', url: '/patients', icon: 'people' },
    // { title: 'My profile', url: '/profile/me', icon: 'person' },
  ];
  #platform = inject(Platform);
  #nav = inject(NavController);
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
      mailOutline
    });

    this.checkToken();
  }

  async checkToken() {
    const { value } = await Preferences.get({ key: 'token' });
    this.menuEnabled = !!value;
  }

  // async initializeApp() {
  //   if (this.#platform.is('capacitor')) {
  //     //...

  //     const res = await PushNotifications.checkPermissions();
  //     if (res.receive !== 'granted') {
  //       await PushNotifications.requestPermissions();
  //     }

  //     // Show us the notification payload if the app is open on our device
  //     PushNotifications.addListener(
  //       'pushNotificationReceived',
  //       async (notification: PushNotificationSchema) => {
  //         const toast = await this.#toast.create({
  //           header: notification.title,
  //           message: notification.body,
  //           duration: 3000,
  //         });
  //         await toast.present();
  //       }
  //     );

  //     // Method called when tapping on a notification
  //     PushNotifications.addListener(
  //       'pushNotificationActionPerformed',
  //       (notification: ActionPerformed) => {
  //         if (notification.notification.data.prodId) {
  //           this.#nav.navigateRoot([
  //             '/products',
  //             notification.notification.data.prodId,
  //             'comments',
  //           ]);
  //         }
  //       }
  //     );
  //   }
  // }
}
