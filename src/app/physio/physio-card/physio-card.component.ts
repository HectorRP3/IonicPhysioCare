import { DatePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
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
} from '@ionic/angular/standalone';
import { Phsyio } from '../interfaces/physio';
@Component({
  selector: 'physio-card',
  templateUrl: './physio-card.component.html',
  styleUrls: ['./physio-card.component.scss'],
  imports: [
    RouterLink,
    IonRouterLink,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonItem,
    IonLabel,
    DatePipe,
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
export class PhysioCardComponent {
  physio = input.required<Phsyio>();
}
