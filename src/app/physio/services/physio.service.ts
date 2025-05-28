import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Physio, PhsyioInsert } from '../interfaces/physio';
import { PhsyioResponse, SinglePhsyioResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class PhysioService {
  #physioUrl = 'physios';
  #http = inject(HttpClient);

  getPhysios(search: String = ''): Observable<PhsyioResponse> {
    let params;
    if (search) {
      params = new URLSearchParams({ filter: search.toString() });
    }
    console.log(`${this.#physioUrl}?${params}`);
    return this.#http
      .get<PhsyioResponse>(`${this.#physioUrl}?${params}`)
      .pipe(map((r) => r));
  }

  getPhysioById(id: String): Observable<SinglePhsyioResponse> {
    return this.#http
      .get<SinglePhsyioResponse>(`${this.#physioUrl}/${id}`)
      .pipe(map((r) => r));
  }

  createPhysio(physio: PhsyioInsert): Observable<SinglePhsyioResponse> {
    return this.#http
      .post<SinglePhsyioResponse>(this.#physioUrl, physio)
      .pipe(map((r) => r));
  }

  deletePhysio(id: String): Observable<SinglePhsyioResponse> {
    return this.#http
      .delete<SinglePhsyioResponse>(`${this.#physioUrl}/${id}`)
      .pipe(map((r) => r));
  }
}
