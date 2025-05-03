import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { UserLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient);
  
  getLogged() {
    return this.#logged.asReadonly();
  }  

  login (data: UserLogin): Observable<void> {
    return this.#http.post<TokenResponse>(`auth/login`, data).pipe(
      // SwitchMap permite trabajar con funciones que devuelven observables o promesas
      switchMap(async (res) => { // Función async, devuelve promesa (Promise<void>)
        try {
          await Preferences.set({ key: 'fs-token', value: res.token });
          this.#logged.set(true);
        } catch (e) {
          throw new Error('Can\'t save authentication token in storage!');
        }
      })
    );
  }  

      decodeToken(token: string): any {
        return JSON.parse(atob(token.split('.')[1]));
      }  

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) { // Estamos logueados
      return of(true);
    }
    // from transforma una promesa en un observable
    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) { // No hay token
          return of(false);
        }

        return this.#http.get('auth/validate').pipe(
          map(() => {
            this.#logged.set(true);
            return true; // Todo correcto
          }),
          catchError(() => of(false)) // Token no válido
        );
      }),
    );
  }

}
