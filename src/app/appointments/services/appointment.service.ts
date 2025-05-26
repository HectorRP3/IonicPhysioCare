import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppointmentsResponse } from '../interfaces/response';
import { Appointment, AppointmentInsert } from '../interfaces/appointment';
import {
  Record2,
  SingleRecordsResponse,
} from 'src/app/shared/interfaces/Records';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  #appointmentUrl = 'appointments';
  #http = inject(HttpClient);

  getAppointmentsPhysio(
    id: string,
    filtro: string = 'future'
  ): Observable<AppointmentsResponse> {
    let urlParams;
    urlParams = new URLSearchParams({
      filter: filtro,
    });
    return this.#http
      .get<AppointmentsResponse>(
        `records/${this.#appointmentUrl}/physio/${id}?${urlParams}`
      )
      .pipe(
        map((r) => {
          return r;
        })
      );
  }
  getAppointmentsPatient(
    id: string,
    filtro: string = 'future'
  ): Observable<AppointmentsResponse> {
    let urlParams;
    urlParams = new URLSearchParams({
      filter: filtro,
    });
    return this.#http
      .get<AppointmentsResponse>(
        `records/${this.#appointmentUrl}/patients/${id}?${urlParams}`
      )
      .pipe(map((r) => r));
  }

  createAppointment(
    appointment: AppointmentInsert,
    idRecord: string
  ): Observable<Record2> {
    return this.#http
      .post<Record2>(`records/${this.#appointmentUrl}/${idRecord}`, appointment)
      .pipe(map((r) => r));
  }

  updateAppointment(appointment: Appointment): Observable<Record2> {
    return this.#http
      .put<Record2>(
        `records/${this.#appointmentUrl}/${appointment._id}`,
        appointment
      )
      .pipe(map((r) => r));
  }

  deleteAppointment(id: string): Observable<void> {
    return this.#http
      .delete<void>(`records/${this.#appointmentUrl}/${id}`)
      .pipe(map((r) => r));
  }

  getRecordByIdPatient(id: string): Observable<SingleRecordsResponse> {
    console.log(id);
    return this.#http.get<SingleRecordsResponse>(`records/patient/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
}
// /records/appointments/physio/67f7ca7d675fb455abf5ad99
