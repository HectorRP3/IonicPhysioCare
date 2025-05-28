import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient, PatientInsert } from '../interfaces/patient';
import { map, Observable } from 'rxjs';
import { PatientsResponse, SinglePatientResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  #patientUrl = 'patients';
  #http = inject(HttpClient);

  getPatients(): Observable<Patient[]> {
    return this.#http
      .get<PatientsResponse>(this.#patientUrl)
      .pipe(map((r) => r.resultado));
  }

  getPatientById(id: string): Observable<Patient> {
    return this.#http
    .get<SinglePatientResponse>(`${this.#patientUrl}/${id}`)
    .pipe(map((r) => {
      console.log("error de servicio:" + r.resultado._id);
      return r.resultado;
    }));
  }

  createPatient(patient: PatientInsert): Observable<PatientInsert> {
    return this.#http
      .post<PatientInsert>(`${this.#patientUrl}`, patient)
      .pipe(map((r) => r))
  }

}
