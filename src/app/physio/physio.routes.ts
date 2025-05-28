import { Routes } from '@angular/router';
export const physioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./physio-form/physio-form.page').then((m) => m.PhysioFormPage),
  },
];
