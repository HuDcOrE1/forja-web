import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { ProdutoRequest } from '../models/produto-request';

import { ProdutoResponse } from '../models/produto-response';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/produtos`;

  listar(): Observable<ProdutoResponse[]> {
    return this.http.get<ProdutoResponse[]>(this.API);
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
