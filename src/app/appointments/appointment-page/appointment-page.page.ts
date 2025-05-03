import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
  AlertController,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'appointment-page',
  templateUrl: './appointment-page.page.html',
  styleUrls: ['./appointment-page.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
  ],
})
export class AppointmentPagePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
