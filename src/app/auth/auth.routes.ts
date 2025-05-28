import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    },
];
