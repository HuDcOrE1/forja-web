import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { RaiaRequest } from '../models/raia-request';

import { RaiaResponse } from '../models/raia-response';

@Injectable({
  providedIn: 'root',
})
export class RaiaService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/raias`;

  listar(): Observable<RaiaResponse[]> {
    return this.http.get<RaiaResponse[]>(this.API);
  }

  obterPorId(id: number): Observable<RaiaResponse> {
    return this.http.get<RaiaResponse>(`${this.API}/${id}`);
  }

  cadastrar(request: RaiaRequest): Observable<RaiaResponse> {
    return this.http.post<RaiaResponse>(this.API, request);
  }

  atualizar(id: number, request: RaiaRequest): Observable<RaiaResponse> {
    return this.http.put<RaiaResponse>(`${this.API}/${id}`, request);
  }

  inativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
