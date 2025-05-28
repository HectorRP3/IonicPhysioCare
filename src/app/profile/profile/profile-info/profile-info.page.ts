import { Component, computed, inject, input, numberAttribute, OnInit } from '@angular/core';
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

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonToolbar, IonTabButton, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRouterLink, IonItem, IonLabel, IonAvatar, IonChip, IonBadge, IonImg, IonButton, IonGrid, IonCol, IonRow, IonCardSubtitle, IonList,]
})
export class ProfileInfoPage {
  patient = inject(ProfilePage).patient;

  constructor() { }

}
