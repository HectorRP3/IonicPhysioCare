import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EMPTY, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

export const logoutActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isLogged()
    .pipe(
      map((logged) => {
        console.log(logged);
        if (logged) {
          return router.createUrlTree(['/physios']);
        }
        return true;
      })
    );
  return EMPTY;
};
