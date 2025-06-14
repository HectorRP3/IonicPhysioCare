import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient, PatientInsert, Record, RecordInsert, RecordResponse } from '../interfaces/patient';
import { map, Observable } from 'rxjs';
import { PatientsResponse, SinglePatientResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  #patientUrl = 'patients';
  #http = inject(HttpClient);

  getPatients(search: String = ''): Observable<PatientsResponse> {
    let params;
    if (search) {
      params = new URLSearchParams({ filter: search.toString() });
    }
    console.log(`${this.#patientUrl}?${params}`);
    return this.#http
      .get<PatientsResponse>(`${this.#patientUrl}?${params}`)
      .pipe(map((r) => r));
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

  deletePatient(id: String): Observable<SinglePatientResponse> {
      return this.#http
        .delete<SinglePatientResponse>(`${this.#patientUrl}/${id}`)
        .pipe(map((r) => r));
  }

  getRecordById(id: string): Observable<Record> {
  return this.#http
    .get<RecordResponse>(`records/patient/${id}`)
    .pipe(map((r) => {
      console.log("Respuesta de record:" + r.resultado._id);
      return r.resultado;
    }));
  }

  updateRecord(record: RecordInsert): Observable<RecordInsert> {
    return this.#http
      .put<RecordInsert>(`records/${record._id}`, record)
      .pipe(map((r) => r));
  }

}
