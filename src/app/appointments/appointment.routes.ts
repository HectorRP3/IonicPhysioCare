import { Routes } from '@angular/router';
import { roleGuard } from '../shared/guards/role.guard';
export const appointmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [roleGuard(['physio', 'patient'])],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./appointment-form/appointment-form.page').then(
        (m) => m.AppointmentFormPage
      ),
    canActivate: [roleGuard(['patient'])],
  },
];
