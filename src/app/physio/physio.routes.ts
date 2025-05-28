import { Routes } from '@angular/router';
import { roleGuard } from '../shared/guards/role.guard';
export const physioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./physio-form/physio-form.page').then((m) => m.PhysioFormPage),
    canActivate: [roleGuard(['admin'])],
  },
];
