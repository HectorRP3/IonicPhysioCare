import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EMPTY, map } from 'rxjs';

export const logoutActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // return inject(AuthService)
  //   .isLogged()
  //   .pipe(map((logged) => !logged || router.createUrlTree(['/products'])));
  return EMPTY;
};
