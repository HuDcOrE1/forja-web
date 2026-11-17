import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  get usuarioLogado(): string {
    const token = this.authService.getToken();

    if (!token) {
      return '';
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.sub ?? '';
    } catch {
      return '';
    }
  }

  get perfilAtual(): string {
    const roles = this.authService.getRoles();

    return roles[0] ?? '';
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
