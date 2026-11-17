import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

import { PerfilResponse } from '../models/perfil-response';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/perfis`;

  listar(): Observable<PerfilResponse[]> {
    return this.http.get<PerfilResponse[]>(this.API);
  }
}
