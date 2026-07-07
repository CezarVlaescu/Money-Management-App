import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth/login',
        loadComponent: () => import('./pages/auth/login/login').then(component => component.Login)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./pages/auth/register/register').then(component => component.Register)
    },
    {
        path: 'auth/forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password').then(component => component.ForgotPassword)
    },
    {
        path: 'auth/update-password',
        loadComponent: () => import('./pages/auth/update-password/update-password').then(component => component.UpdatePassword)
    },
    {
        path: '',
        loadComponent: () => import('./features/layout/layout').then(component => component.Layout),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard').then(component => component.Dashboard)
            },
            {
                path: 'expenses',
                loadComponent: () => import('./pages/expenses/expenses').then(component => component.Expenses)
            },
            {
                path: 'savings-goals',
                loadComponent: () => import('./pages/saving-goals/saving-goals').then(component => component.SavingGoals)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings').then(component => component.Settings)
            },
            {
                path: 'privacy',
                loadComponent: () => import('./features/privacy/privacy').then(component => component.Privacy)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
