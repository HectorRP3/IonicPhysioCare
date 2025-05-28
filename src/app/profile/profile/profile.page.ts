import { afterNextRender, Component, computed, inject, input, numberAttribute, OnInit } from '@angular/core';
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
  IonImg,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonCardSubtitle,
  IonList, 
  IonTabs,
  IonTabButton,
  IonTabBar
 } from '@ionic/angular/standalone';
import { PatientService } from 'src/app/patient/services/patient.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRouterLink, IonItem, IonLabel, IonAvatar, IonChip, IonBadge, IonImg, IonButton, IonGrid, IonCol, IonRow, IonCardSubtitle, IonList],
})
export class ProfilePage {
  #patientService = inject(PatientService);

  id = input.required<string>();
  patientResource = rxResource({
    request: () => this.id(),
    loader: ({request: id}) => this.#patientService.getPatientById(id!),
  });
  patient = computed(() => this.patientResource.value());

}