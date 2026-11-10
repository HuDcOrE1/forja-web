import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;

  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastSubject = new BehaviorSubject<ToastMessage | null>(null);

  readonly toast$ = this.toastSubject.asObservable();

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, type: ToastMessage['type']): void {
    this.toastSubject.next({
      message,
      type,
    });

    setTimeout(() => {
      this.toastSubject.next(null);
    }, 4000);
  }
}
