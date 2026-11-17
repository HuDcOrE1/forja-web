import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { VendaRequest } from '../models/venda-request';

import { VendaResponse } from '../models/venda-response';

import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private readonly http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}/vendas`;

  listar(
    page = 0,
    size = 20,
    clienteId?: number,
    status?: string,
    termo?: string,
  ): Observable<PageResponse<VendaResponse>> {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };

    if (clienteId) {
      params['clienteId'] = String(clienteId);
    }

    if (status) {
      params['status'] = status;
    }

    if (termo?.trim()) {
      params['termo'] = termo;
    }

    return this.http.get<PageResponse<VendaResponse>>(this.api, {
      params,
    });
  }

  obterPorId(id: number): Observable<VendaResponse> {
    return this.http.get<VendaResponse>(`${this.api}/${id}`);
  }

  cadastrar(request: VendaRequest): Observable<VendaResponse> {
    return this.http.post<VendaResponse>(this.api, request);
  }

  cancelar(id: number, motivo: string): Observable<VendaResponse> {
    return this.http.patch<VendaResponse>(`${this.api}/${id}/cancelar`, {
      motivo,
    });
  }
}
