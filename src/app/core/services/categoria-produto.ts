import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { CategoriaProdutoRequest } from '../models/categoria-produto-request';

import { CategoriaProdutoResponse } from '../models/categoria-produto-response';

@Injectable({
  providedIn: 'root',
})
export class CategoriaProdutoService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/categorias-produto`;

  listar(): Observable<CategoriaProdutoResponse[]> {
    return this.http.get<CategoriaProdutoResponse[]>(this.API);
  }

  obterPorId(id: number): Observable<CategoriaProdutoResponse> {
    return this.http.get<CategoriaProdutoResponse>(`${this.API}/${id}`);
  }

  cadastrar(categoria: CategoriaProdutoRequest): Observable<CategoriaProdutoResponse> {
    return this.http.post<CategoriaProdutoResponse>(this.API, categoria);
  }

  atualizar(id: number, categoria: CategoriaProdutoRequest): Observable<CategoriaProdutoResponse> {
    return this.http.put<CategoriaProdutoResponse>(`${this.API}/${id}`, categoria);
  }

  inativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
