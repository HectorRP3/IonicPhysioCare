import { Component } from '@angular/core';

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
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  menuEnabled = false;

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
    });

    this.checkToken();
  }

  async checkToken() {
    const { value } = await Preferences.get({ key: 'token' });
    this.menuEnabled = !!value;
  }
}
