import { Routes } from '@angular/router';
export const appointmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
];
