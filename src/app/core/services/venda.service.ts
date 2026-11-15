import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { VendaRequest } from '../models/venda-request';
import { VendaResponse } from '../models/venda-response';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private readonly http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}/vendas`;

  listar(): Observable<VendaResponse[]> {
    return this.http.get<VendaResponse[]>(this.api);
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
