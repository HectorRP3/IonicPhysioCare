import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { EMPTY } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import { from, Observable } from 'rxjs';

export function roleGuard(roles: string[]): CanActivateFn {
  return (route) => {
    const authService = inject(AuthService);
    return from(
      Preferences.get({ key: 'fs-token' }).then(({ value: token }) => {
        const rol = token ? authService.decodeToken(token).rol : null;
        if (rol && roles.includes(rol)) {
          return true;
        }
        return false;
      })
    );
  };
}
