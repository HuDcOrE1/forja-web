import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { EntradaEstoqueRequest } from '../models/entrada-estoque-request';

import { SaidaEstoqueRequest } from '../models/saida-estoque-request';

import { MovimentacaoEstoqueResponse } from '../models/movimentacao-estoque-response';

import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoEstoqueService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/estoque`;

  entrada(request: EntradaEstoqueRequest): Observable<MovimentacaoEstoqueResponse> {
    return this.http.post<MovimentacaoEstoqueResponse>(`${this.API}/entrada`, request);
  }

  saida(request: SaidaEstoqueRequest): Observable<MovimentacaoEstoqueResponse> {
    return this.http.post<MovimentacaoEstoqueResponse>(`${this.API}/saida`, request);
  }

  historico(
    page = 0,
    size = 20,
    produtoId?: number,
    tipo?: string,
  ): Observable<PageResponse<MovimentacaoEstoqueResponse>> {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };

    if (produtoId) {
      params['produtoId'] = String(produtoId);
    }

    if (tipo) {
      params['tipo'] = tipo;
    }

    return this.http.get<PageResponse<MovimentacaoEstoqueResponse>>(`${this.API}/historico`, {
      params,
    });
  }

  historicoProduto(produtoId: number): Observable<PageResponse<MovimentacaoEstoqueResponse>> {
    return this.historico(0, 20, produtoId);
  }
}
