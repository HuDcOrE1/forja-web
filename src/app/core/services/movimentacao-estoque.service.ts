import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { EntradaEstoqueRequest } from '../models/entrada-estoque-request';

import { SaidaEstoqueRequest } from '../models/saida-estoque-request';

import { MovimentacaoEstoqueResponse } from '../models/movimentacao-estoque-response';

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

  historico(): Observable<MovimentacaoEstoqueResponse[]> {
    return this.http.get<MovimentacaoEstoqueResponse[]>(`${this.API}/historico`);
  }

  historicoProduto(produtoId: number): Observable<MovimentacaoEstoqueResponse[]> {
    return this.http.get<MovimentacaoEstoqueResponse[]>(`${this.API}/produto/${produtoId}`);
  }
}
