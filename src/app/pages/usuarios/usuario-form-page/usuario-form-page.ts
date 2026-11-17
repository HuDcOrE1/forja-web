import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { UsuarioFormComponent } from '../components/usuario-form/usuario-form';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ToastService } from '../../../shared/services/toast.service';
import { UsuarioResponse } from '../../../core/models/usuario-response';
import { UsuarioRequest } from '../../../core/models/usuario-request';

@Component({
  selector: 'app-usuario-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, UsuarioFormComponent],
  templateUrl: './usuario-form-page.html',
  styleUrl: './usuario-form-page.scss',
})
export class UsuarioFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly usuarioService = inject(UsuarioService);

  private readonly toastService = inject(ToastService);

  usuario?: UsuarioResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.usuarioService.obterPorId(Number(id)).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  salvar(usuario: UsuarioRequest): void {
    if (this.editando && this.usuario) {
      this.usuarioService.atualizar(this.usuario.id, usuario).subscribe({
        next: () => {
          this.toastService.success('Usuário atualizado com sucesso.');

          this.router.navigate(['/usuarios', this.usuario!.id]);
        },

        error: () => {
          this.toastService.error('Erro ao atualizar usuário.');
        },
      });

      return;
    }

    this.usuarioService.cadastrar(usuario).subscribe({
      next: () => {
        this.toastService.success('Usuário cadastrado com sucesso.');

        this.router.navigate(['/usuarios']);
      },

      error: () => {
        this.toastService.error('Erro ao cadastrar usuário.');
      },
    });
  }
}
