import { Routes } from '@angular/router';

export const routes: Routes = [
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
