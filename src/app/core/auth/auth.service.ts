import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';


import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http =
    inject(HttpClient);

  private readonly API =
    `${environment.apiUrl}/auth/login`;

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      this.API,
      request
    ).pipe(
      tap(response => {

        localStorage.setItem(
          'forja_token',
          response.token
        );
      })
    );
  }

  logout(): void {

    localStorage.removeItem(
      'forja_token'
    );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'forja_token'
    );
  }

  isAuthenticated(): boolean {

    return !!this.getToken();
  }
}