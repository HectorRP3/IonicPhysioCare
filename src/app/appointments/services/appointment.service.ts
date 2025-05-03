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

  getAppointmentsPhysio(id: string): Observable<AppointmentsResponse> {
    return this.#http
      .get<AppointmentsResponse>(
        `records/${this.#appointmentUrl}/patients/${id}`
      )
      .pipe(
        map((r) => {
          console.log(r.resultado);
          return r;
        })
      );
  }
  getAppointmentsPatient(id: string): Observable<AppointmentsResponse> {
    return this.#http
      .get<AppointmentsResponse>(`records/${this.#appointmentUrl}/physio/${id}`)
      .pipe(map((r) => r));
  }
}
// /records/appointments/physio/67f7ca7d675fb455abf5ad99
