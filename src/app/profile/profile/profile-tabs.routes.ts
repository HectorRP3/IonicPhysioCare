import { Routes } from "@angular/router";

export const profileTabsRoutes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./profile-info/profile-info.page').then(
        (m) => m.ProfileInfoPage
      ),
  },
  {
    path: 'location',
    loadComponent: () =>
      import('./profile-location/profile-location.page').then(
        (m) => m.ProfileLocationPage
      ),
  },
  {
    path: 'record',
    loadComponent: () =>
      import('./profile-record/profile-record.page').then(
        (m) => m.ProfileRecordPage
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'info' },
];