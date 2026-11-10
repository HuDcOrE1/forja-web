import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { ClienteResponse } from '../models/cliente-response';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/clientes`;

  listar(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(this.API);
  }

  obterPorId(id: number): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.API}/${id}`);
  }

  cadastrar(cliente: unknown): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.API, cliente);
  }

  atualizar(id: number, cliente: unknown): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.API}/${id}`, cliente);
  }

  inativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
