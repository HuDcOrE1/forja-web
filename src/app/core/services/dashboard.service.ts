import { Injectable, inject } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../../environment/environment';

import {
  DashboardResponse
} from '../models/dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http =
    inject(HttpClient);

  private readonly API =
    `${environment.apiUrl}/dashboard`;

  obterDashboard():
    Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(
      this.API
    );
  }

  faturamentoDiario(
    inicio?: string,
    fim?: string
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/faturamento-diario`,
      {
        params: {
          ...(inicio ? { inicio } : {}),
          ...(fim ? { fim } : {})
        }
      }
    );
  }

  faturamentoMensal(
    inicio?: string,
    fim?: string
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/faturamento-mensal`,
      {
        params: {
          ...(inicio ? { inicio } : {}),
          ...(fim ? { fim } : {})
        }
      }
    );
  }

  topProdutos():
    Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/top-produtos`
    );
  }

  topClientes():
    Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/top-clientes`
    );
  }

  ocupacaoRaias():
    Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/ocupacao-raias`
    );
  }

  saudeEstoque():
    Observable<any> {

    return this.http.get<any>(
      `${this.API}/saude-estoque`
    );
  }

  conversaoOperacional():
    Observable<any> {

    return this.http.get<any>(
      `${this.API}/conversao`
    );
  }

  receitaFormaPagamento():
    Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/receita-forma-pagamento`
    );
  }

  receitaCategoria():
    Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/receita-categoria`
    );
  }
}