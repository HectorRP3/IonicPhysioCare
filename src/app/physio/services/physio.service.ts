import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Phsyio } from '../interfaces/physio';
import { PhsyioResponse, SinglePhsyioResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class PhysioService {
  #physioUrl = 'physios';
  #http = inject(HttpClient);

  getPhysios(): Observable<PhsyioResponse> {
    return this.#http.get<PhsyioResponse>(this.#physioUrl).pipe(map((r) => r));
  }

  getPhysioById(id: String): Observable<SinglePhsyioResponse> {
    return this.#http
      .get<SinglePhsyioResponse>(`${this.#physioUrl}/${id}`)
      .pipe(map((r) => r));
  }
}
