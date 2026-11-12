import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { SaidaEstoqueFormComponent } from '../components/saida-estoque-form/saida-estoque-form';
import { MovimentacaoEstoqueService } from '../../../core/services/movimentacao-estoque.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SaidaEstoqueRequest } from '../../../core/models/saida-estoque-request';

@Component({
  selector: 'app-saida-estoque-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SaidaEstoqueFormComponent],
  templateUrl: './saida-estoque-page.html',
  styleUrl: './saida-estoque-page.scss',
})
export class SaidaEstoquePageComponent {
  private readonly _router = inject(Router);
  public get router() {
    return this._router;
  }

  private readonly estoqueService = inject(MovimentacaoEstoqueService);

  private readonly toastService = inject(ToastService);

  salvar(request: SaidaEstoqueRequest): void {
    this.estoqueService.saida(request).subscribe({
      next: () => {
        this.toastService.success('Saída de estoque registrada com sucesso.');

        this.router.navigate(['/estoque']);
      },

      error: (erro) => {
        const mensagem =
          erro?.error?.message ?? erro?.error?.errors?.[0] ?? 'Erro ao registrar saída de estoque.';

        this.toastService.error(mensagem);
      },
    });
  }
}
