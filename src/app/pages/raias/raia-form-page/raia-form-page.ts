import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RaiaFormComponent } from '../components/raia-form/raia-form';
import { RaiaService } from '../../../core/services/raia.service';
import { ToastService } from '../../../shared/services/toast.service';
import { RaiaResponse } from '../../../core/models/raia-response';
import { RaiaRequest } from '../../../core/models/raia-request';

@Component({
  selector: 'app-raia-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RaiaFormComponent],
  templateUrl: './raia-form-page.html',
  styleUrl: './raia-form-page.scss',
})
export class RaiaFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly raiaService = inject(RaiaService);

  private readonly toastService = inject(ToastService);

  raia?: RaiaResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.raiaService.obterPorId(Number(id)).subscribe((raia) => {
      this.raia = raia;
    });
  }

  salvar(raia: RaiaRequest): void {
    if (this.editando && this.raia) {
      this.raiaService.atualizar(this.raia.id, raia).subscribe({
        next: () => {
          this.toastService.success('Raia atualizada com sucesso.');

          this.router.navigate(['/raias', this.raia!.id]);
        },

        error: (erro) => {
          const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao atualizar raia.';

          this.toastService.error(mensagem);
        },
      });

      return;
    }

    this.raiaService.cadastrar(raia).subscribe({
      next: () => {
        this.toastService.success('Raia cadastrada com sucesso.');

        this.router.navigate(['/raias']);
      },

      error: (erro) => {
        const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao cadastrar raia.';

        this.toastService.error(mensagem);
      },
    });
  }
}
