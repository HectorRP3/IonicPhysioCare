import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppointmentsResponse } from '../interfaces/response';

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

  deleteAppointment(id: string): Observable<void> {
    return this.#http
      .delete<void>(`records/${this.#appointmentUrl}/${id}`)
      .pipe(map((r) => r));
  }
}
// /records/appointments/physio/67f7ca7d675fb455abf5ad99
