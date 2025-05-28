import { afterNextRender, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfilePage } from '../profile.page';
import { OlMapDirective } from 'src/app/shared/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/shared/ol-maps/ol-marker.directive';

@Component({
  selector: 'profile-location',
  templateUrl: './profile-location.page.html',
  styleUrls: ['./profile-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, OlMapDirective, OlMarkerDirective]
})
export class ProfileLocationPage {
  patient = inject(ProfilePage).patient;
  coordinates = signal<[number, number]>([0, 0]);

  constructor() { 
      afterNextRender(() => {
        if(this.patient()){
          this.coordinates.set([
            this.patient()!.lng ?? 0,
            this.patient()!.lat ?? 0
          ])
        }
      })
   }

}
