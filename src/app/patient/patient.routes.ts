import { Routes } from '@angular/router';
import { roleGuard } from '../shared/guards/role.guard';

export const patientRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [roleGuard(['physio', 'admin'])],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./patient-form/patient-form.page').then((m) => m.PatientFormPage),
    canActivate: [roleGuard(['admin'])],
  },
];
