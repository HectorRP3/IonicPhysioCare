import { afterNextRender, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { ProfilePage } from '../profile.page';
import { OlMapDirective } from 'src/app/shared/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/shared/ol-maps/ol-marker.directive';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator';

@Component({
  selector: 'profile-location',
  templateUrl: './profile-location.page.html',
  styleUrls: ['./profile-location.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, OlMapDirective, OlMarkerDirective, IonFab, IonFabButton, IonIcon]
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

   openGPS() {
      LaunchNavigator.navigate(this.coordinates().reverse());
   }

}
