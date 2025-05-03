import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.routes').then((m) => m.patientRoutes),
  },
  {
    path: 'physios',
    loadChildren: () =>
      import('./physio/physio.routes').then((m) => m.physioRoutes),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointment.routes').then(
        (m) => m.appointmentRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
