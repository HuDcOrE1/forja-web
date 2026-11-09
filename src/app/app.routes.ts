import { Routes } from '@angular/router';

import { LoginComponent }
from './pages/login/login';

import { DashboardComponent }
from './pages/dashboard/dashboard';

import { authGuard }
from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

import { ClientesComponent }
from './pages/clientes/clientes';
import { ClienteDetailsPageComponent } from './pages/clientes/components/cliente-details-page/cliente-details-page';
import { ClienteFormComponent } from './pages/clientes/components/cliente-form/cliente-form';
import { ClienteFormPageComponent } from './pages/clientes/cliente-form-page/cliente-form-page';


export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

    {
    path: '',
    component: MainLayoutComponent,
    canActivate: [
        authGuard
    ],
    children: [
        {
            path: '',
            component: DashboardComponent
        },

        {
            path: 'clientes',
            component: ClientesComponent
        },

        {
            path: 'clientes/novo',
            component: ClienteFormPageComponent
        },

        {
            path: 'clientes/:id',
            component: ClienteDetailsPageComponent
        },

        {
            path: 'clientes/:id/editar',
            component: ClienteFormPageComponent
        }

    ]
    },
    
    {
    path: '**',
    redirectTo: ''
  }
];