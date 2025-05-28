import { Routes } from "@angular/router";

export const profileRoutes: Routes = [
    {
        path: 'me',
        loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
        loadChildren: () => import('./profile/profile-tabs.routes').then((m) => m.profileTabsRoutes),
    },
    {
        path: ':id',
        loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
        loadChildren: () => import('./profile/profile-tabs.routes').then((m) => m.profileTabsRoutes),
    },
    { path: '', redirectTo: '/profile/me', pathMatch: 'full' },
];