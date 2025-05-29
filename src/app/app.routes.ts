import { Routes } from '@angular/router';
import { logoutActivateGuard } from './shared/guards/logout-activate.guard';
import { loginActivateGuard } from './shared/guards/login-activate.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [logoutActivateGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.routes').then((m) => m.patientRoutes),
    canActivate: [loginActivateGuard],
  },
  {
    path: 'physios',
    loadChildren: () =>
      import('./physio/physio.routes').then((m) => m.physioRoutes),
    canActivate: [loginActivateGuard],
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointment.routes').then(
        (m) => m.appointmentRoutes
      ),
    canActivate: [loginActivateGuard],
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
    canActivate: [loginActivateGuard],
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/auth/login' },
];
