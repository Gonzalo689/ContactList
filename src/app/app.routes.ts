import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./contactlist/contactlist.component').then(m => m.ContactlistComponent)
    },
    {
        path: 'new',
        loadComponent: () => import('./contactform/contactform.component').then(m => m.ContactformComponent)
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./contactform/contactform.component').then(m => m.ContactformComponent)
    }
];
