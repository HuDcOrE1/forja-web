import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { AgendamentoRequest } from '../models/agendamento-request';

import { AgendamentoResponse } from '../models/agendamento-response';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/agendamentos`;

  listar(): Observable<AgendamentoResponse[]> {
    return this.http.get<AgendamentoResponse[]>(this.API);
  }

  obterPorId(id: number): Observable<AgendamentoResponse> {
    return this.http.get<AgendamentoResponse>(`${this.API}/${id}`);
  }

  cadastrar(request: AgendamentoRequest): Observable<AgendamentoResponse> {
    return this.http.post<AgendamentoResponse>(this.API, request);
  }

  atualizar(id: number, request: AgendamentoRequest): Observable<AgendamentoResponse> {
    return this.http.put<AgendamentoResponse>(`${this.API}/${id}`, request);
  }

  cancelar(id: number): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}/cancelar`, {});
  }

  finalizar(id: number): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}/finalizar`, {});
  }
}
