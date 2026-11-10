import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ViaCepResponse } from '../models/viacep-response';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly http = inject(HttpClient);

  buscarCep(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
