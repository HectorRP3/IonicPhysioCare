import {
  afterNextRender,
  afterRenderEffect,
  Component,
  effect,
  inject,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ModalController,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { Appointment } from '../../interfaces/appointment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
  ],
})
export class AppointmentEditComponent {
  #modalCtrl = inject(ModalController);
  date = '';
  physioId = '';
  patientId = '';
  status = '';
  treatment = '';
  diagnosis = '';
  observations = '';
  appointmentId = '';
  #fb = inject(NonNullableFormBuilder);

  appointmentForm = this.#fb.group({
    date: [this.date],
    physio: [this.physioId],
    patient: [this.patientId],
    status: [this.status],
    treatment: [this.treatment],
    diagnosis: [this.diagnosis],
    observations: [this.observations],
  });

  constructor() {
    effect(() => {
      this.appointmentForm.patchValue({
        date: this.date,
        physio: this.physioId,
        patient: this.patientId,
        status: this.status,
        treatment: this.treatment,
        diagnosis: this.diagnosis,
        observations: this.observations,
      });
    });
  }

  editAppointment() {
    const updatedAppointment: Appointment = {
      _id: this.appointmentId,
      date: this.date,
      status: this.appointmentForm.get('status')?.value,
      treatment: this.appointmentForm.get('treatment')?.value,
      diagnosis: this.appointmentForm.get('diagnosis')?.value,
      observations: this.appointmentForm.get('observations')?.value,
      physio: this.physioId,
      patient: this.patientId,
    };
    console.log('Updated Appointment:', updatedAppointment);
    this.#modalCtrl.dismiss({ appointment: updatedAppointment });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
