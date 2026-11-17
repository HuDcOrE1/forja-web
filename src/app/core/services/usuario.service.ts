import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { UsuarioRequest } from '../models/usuario-request';

import { UsuarioResponse } from '../models/usuario-response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/usuarios`;

  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.API);
  }

  obterPorId(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.API}/${id}`);
  }

  cadastrar(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.API, usuario);
  }

  atualizar(id: number, usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.API}/${id}`, usuario);
  }

  inativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
