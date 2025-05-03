import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = '';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const res: any = await this.http.post('https://hectorrp.com/api/physios', { email, password }).toPromise();
      this.token = res.token;
      await Preferences.set({ key: 'token', value: this.token });
      return this.token;
    } catch (err) {
      console.error('Login error', err);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value || null;
  }

  decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
