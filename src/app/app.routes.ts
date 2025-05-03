import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.routes').then((m) => m.patientRoutes),
  },
  {
    path: 'physio',
    loadChildren: () =>
      import('./physio/physio.routes').then((m) => m.physioRoutes),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.routes').then(
        (m) => m.appointmentRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
];
