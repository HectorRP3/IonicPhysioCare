import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EMPTY, map } from 'rxjs';

export const loginActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // return inject(AuthService)
  //   .isLogged()
  //   .pipe(map((logged) => logged || router.createUrlTree(['/auth/login'])));
  return EMPTY;
};
