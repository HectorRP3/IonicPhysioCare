import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfileInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
