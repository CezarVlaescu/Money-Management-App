import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/layout/app-shell/app-shell').then(m => m.AppShell),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'expenses',
                loadComponent: () => import('./pages/expenses/expenses').then(m => m.Expenses)
            },
            {
                path: 'savings-goals',
                loadComponent: () => import('./pages/saving-goals/saving-goals').then(m => m.SavingGoals)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
