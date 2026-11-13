import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';

import { DashboardComponent } from './pages/dashboard/dashboard';

import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

import { ClientesComponent } from './pages/clientes/clientes';
import { ClienteDetailsPageComponent } from './pages/clientes/components/cliente-details-page/cliente-details-page';
import { ClienteFormPageComponent } from './pages/clientes/cliente-form-page/cliente-form-page';
import { ProdutosComponent } from './pages/produtos/produtos';

import { ProdutoDetailsPageComponent } from './pages/produtos/produto-details-page/produto-details-page';
import { ProdutoFormPageComponent } from './pages/produtos/produto-form-page/produto-form-page';

import { CategoriasProdutoComponent } from './pages/categorias-produto/categorias-produto';

import { CategoriaDetailsPageComponent } from './pages/categorias-produto/categoria-details-page/categoria-details-page';

import { CategoriaFormPageComponent } from './pages/categorias-produto/categoria-form-page/categoria-form-page';

import { RaiasComponent } from './pages/raias/raias';

import { RaiaFormPageComponent } from './pages/raias/raia-form-page/raia-form-page';

import { RaiaDetailsPageComponent } from './pages/raias/raia-details-page/raia-details-page';
import { AgendamentoFormPageComponent } from './pages/agendamentos/agendamento-form-page/agendamento-form-page';
import { AgendamentoDetailsPageComponent } from './pages/agendamentos/agendamento-details-page/agendamento-details-page';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos';
import { SaidaEstoquePageComponent } from './pages/estoque/saida-estoque-page/saida-estoque-page';
import { EntradaEstoquePageComponent } from './pages/estoque/entrada-estoque-page/entrada-estoque-page';
import { EstoqueComponent } from './pages/estoque/estoque';
import { RelatoriosComponent } from './pages/relatorios/relatorios';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      /* CLIENTES */

      {
        path: 'clientes',
        component: ClientesComponent,
      },

      {
        path: 'clientes/novo',
        component: ClienteFormPageComponent,
      },

      {
        path: 'clientes/:id',
        component: ClienteDetailsPageComponent,
      },

      {
        path: 'clientes/:id/editar',
        component: ClienteFormPageComponent,
      },

      /* PRODUTOS */

      {
        path: 'produtos',
        component: ProdutosComponent,
      },

      {
        path: 'produtos/novo',
        component: ProdutoFormPageComponent,
      },

      {
        path: 'produtos/:id',
        component: ProdutoDetailsPageComponent,
      },

      {
        path: 'produtos/:id/editar',
        component: ProdutoFormPageComponent,
      },

      /* CATEGORIAS DE PRODUTO */
      {
        path: 'categorias-produto',
        component: CategoriasProdutoComponent,
      },

      {
        path: 'categorias-produto/novo',
        component: CategoriaFormPageComponent,
      },

      {
        path: 'categorias-produto/:id',
        component: CategoriaDetailsPageComponent,
      },

      {
        path: 'categorias-produto/:id/editar',
        component: CategoriaFormPageComponent,
      },

      /* RAIAS */
      {
        path: 'raias',
        component: RaiasComponent,
      },

      {
        path: 'raias/novo',
        component: RaiaFormPageComponent,
      },

      {
        path: 'raias/:id',
        component: RaiaDetailsPageComponent,
      },

      {
        path: 'raias/:id/editar',
        component: RaiaFormPageComponent,
      },

      /* AGENDAMENTOS */
      {
        path: 'agendamentos',
        component: AgendamentosComponent,
      },

      {
        path: 'agendamentos/novo',
        component: AgendamentoFormPageComponent,
      },

      {
        path: 'agendamentos/:id',
        component: AgendamentoDetailsPageComponent,
      },

      {
        path: 'agendamentos/:id/editar',
        component: AgendamentoFormPageComponent,
      },

      /* ESTOQUE */
      {
        path: 'estoque',
        component: EstoqueComponent,
      },

      {
        path: 'estoque/entrada',
        component: EntradaEstoquePageComponent,
      },

      {
        path: 'estoque/saida',
        component: SaidaEstoquePageComponent,
      },

      /* RELATÓRIOS */
      {
        path: 'relatorios',
        component: RelatoriosComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
