import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import {
  FormatoExportacao,
  RelatorioAgendamento,
  RelatorioClientes,
  RelatorioEstoque,
  RelatorioRaia,
  RelatorioVenda,
} from '../models/relatorio.model';

type Parametros = Record<string, string | number | boolean | null | undefined>;

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/relatorios`;

  vendas(filtros: {
    clienteId: number | null;
    formaPagamento: string;
    status: string;
    inicio: string;
    fim: string;
    page: number;
    size: number;
  }): Observable<RelatorioVenda[]> {
    return this.http.get<RelatorioVenda[]>(`${this.API}/vendas`, {
      params: this.criarParametros(filtros),
    });
  }

  estoque(filtros: {
    categoriaId: number | null;
    estoqueMinimo: number | null;
    page: number;
    size: number;
  }): Observable<RelatorioEstoque[]> {
    return this.http.get<RelatorioEstoque[]>(`${this.API}/estoque`, {
      params: this.criarParametros(filtros),
    });
  }

  clientes(): Observable<RelatorioClientes> {
    return this.http.get<RelatorioClientes>(`${this.API}/clientes`);
  }

  agendamentos(filtros: {
    clienteId: number | null;
    raiaId: number | null;
    status: string;
    page: number;
    size: number;
  }): Observable<RelatorioAgendamento[]> {
    return this.http.get<RelatorioAgendamento[]>(`${this.API}/agendamentos`, {
      params: this.criarParametros(filtros),
    });
  }

  raias(): Observable<RelatorioRaia[]> {
    return this.http.get<RelatorioRaia[]>(`${this.API}/raias`);
  }

  exportar(tipo: 'vendas' | 'estoque', formato: FormatoExportacao): Observable<Blob> {
    return this.http.get(`${this.API}/${tipo}/export/${formato}`, {
      responseType: 'blob',
    });
  }

  private criarParametros(filtros: Parametros): HttpParams {
    let params = new HttpParams();

    for (const [chave, valor] of Object.entries(filtros)) {
      if (valor !== null && valor !== undefined && valor !== '') {
        params = params.set(chave, String(valor));
      }
    }

    return params;
  }
}
