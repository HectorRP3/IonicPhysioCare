import { Routes } from '@angular/router';

export const patientRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('./event-detail/event-detail.page').then(
  //       (m) => m.EventDetailPage
  //     ),
  //   loadChildren: () =>
  //     import('./event-detail/event-detail.routes').then((m) => m.eventDetailRoutes),
  // },
];
