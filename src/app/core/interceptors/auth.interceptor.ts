import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  const token = authService.getToken();

  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        authService.logout();

        if (router.url !== '/login') {
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    }),
  );
};
