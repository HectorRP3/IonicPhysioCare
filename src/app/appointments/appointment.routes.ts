import { Routes } from '@angular/router';
export const appointmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./appointment-form/appointment-form.page').then(
        (m) => m.AppointmentFormPage
      ),
  },
];
