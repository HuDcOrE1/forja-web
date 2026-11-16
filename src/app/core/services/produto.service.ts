import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { ProdutoRequest } from '../models/produto-request';

import { ProdutoResponse } from '../models/produto-response';

import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/produtos`;

  listar(
    page = 0,
    size = 20,
    termo?: string,
    statusEstoque?: string,
  ): Observable<PageResponse<ProdutoResponse>> {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };

    if (termo?.trim()) {
      params['termo'] = termo;
    }

    if (statusEstoque) {
      params['statusEstoque'] = statusEstoque;
    }

    return this.http.get<PageResponse<ProdutoResponse>>(this.API, {
      params,
    });
  }

  obterPorId(id: number): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.API}/${id}`);
  }

  cadastrar(produto: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.post<ProdutoResponse>(this.API, produto);
  }

  atualizar(id: number, produto: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.put<ProdutoResponse>(`${this.API}/${id}`, produto);
  }

  inativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
