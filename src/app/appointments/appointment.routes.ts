import { Routes } from '@angular/router';
export const appointmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./appointment-page/appointment-page.page').then(
        (m) => m.AppointmentPagePage
      ),
  },
];
