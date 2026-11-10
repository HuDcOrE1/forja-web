import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request';

import { LoginResponse } from '../models/login-response';

import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/auth/login`;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API, request).pipe(
      tap((response) => {
        localStorage.setItem('forja_token', response.token);

        localStorage.setItem('forja_login_time', Date.now().toString());
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('forja_token');

    localStorage.removeItem('forja_login_time');
  }

  getToken(): string | null {
    return localStorage.getItem('forja_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expiration = payload.exp * 1000;

      if (Date.now() >= expiration) {
        this.logout();

        return false;
      }

      return true;
    } catch {
      this.logout();

      return false;
    }
  }

  getTokenExpirationDate(): Date | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpirationDate();

    if (!expiration) {
      return true;
    }

    return expiration.getTime() <= Date.now();
  }
}
