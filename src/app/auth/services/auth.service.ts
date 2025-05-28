import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { UserLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/responses';
import { Patient } from 'src/app/patient/interfaces/patient';
import { Physio } from 'src/app/physio/interfaces/physio';
import { cloudyNight } from 'ionicons/icons';
import { SinglePhsyioResponse } from 'src/app/physio/interfaces/response';
import { SinglePatientResponse } from 'src/app/patient/interfaces/responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient);
  rol = signal<string>('');
  idUser = signal<string>('');

  getProfile(): Observable<Physio | Patient | null> {
    console.log('getProfile called');
    console.log(this.rol());
    const token = Preferences.get({ key: 'fs-token' }).then(({ value }) => {
      if (value) {
        const decodedToken = this.decodeToken(value);
        this.rol.set(decodedToken.rol);
        this.idUser.set(decodedToken.id);
      } else {
        console.error('No token found');
      }
    });
    if (this.rol() === 'physio') {
      return this.#http.get<SinglePhsyioResponse>(`physios/me`).pipe(
        map((res) => {
          return res.resultado;
        }),
        catchError(() => of(null)) // Manejo de error, devuelve null si no se encuentra el perfil
      );
    }
    if (this.rol() === 'patient') {
      return this.#http.get<SinglePatientResponse>(`patients/me`).pipe(
        map((res) => {
          return res.resultado;
        }),
        catchError(() => of(null)) // Manejo de error, devuelve null si no se encuentra el perfil
      );
    }

    return of(null); // Si no es ni physio ni patient, devuelve null
  }

  getLogged() {
    return this.#logged.asReadonly();
  }

  login(data: UserLogin): Observable<TokenResponse> {
    return this.#http.post<TokenResponse>(`auth/login`, data).pipe(
      // SwitchMap permite trabajar con funciones que devuelven observables o promesas
      switchMap(async (res) => {
        // Función async, devuelve promesa (Promise<void>)
        try {
          await Preferences.set({ key: 'fs-token', value: res.token });
          await Preferences.set({ key: 'fs-iduser', value: res.id });
          const token = this.decodeToken(res.token);
          this.rol.set(res.rol);
          console.log(res);
          this.#logged.set(true);
          return res;
        } catch (e) {
          throw new Error("Can't save authentication token in storage!");
        }
      })
    );
  }

  decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    await Preferences.remove({ key: 'fs-iduser' });
    this.rol.set('');
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) {
      // Estamos logueados
      return of(true);
    }
    // from transforma una promesa en un observable
    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          // No hay token
          return of(false);
        }
        return of(true);
        // return this.#http.get('auth/validate').pipe(
        //   map(() => {
        //     this.#logged.set(true);
        //     return true;
        //   }),
        //   catchError(() => of(false)) // Token no válido
        // );
      })
    );
  }
}
