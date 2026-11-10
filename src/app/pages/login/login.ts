import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  ocultarSenha = true;

  carregando = false;

  erroLogin = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    senha: ['', [Validators.required]],
  });

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.carregando = true;

    this.erroLogin = '';

    this.authService
      .login({
        email: this.form.value.email!,

        senha: this.form.value.senha!,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },

        error: () => {
          this.carregando = false;

          this.erroLogin = 'Usuário ou senha inválidos.';
        },
      });
  }
}
