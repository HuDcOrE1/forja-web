import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { EntradaEstoqueFormComponent } from '../components/entrada-estoque-form/entrada-estoque-form';
import { MovimentacaoEstoqueService } from '../../../core/services/movimentacao-estoque.service';
import { ToastService } from '../../../shared/services/toast.service';
import { EntradaEstoqueRequest } from '../../../core/models/entrada-estoque-request';

@Component({
  selector: 'app-entrada-estoque-page',
  standalone: true,
  imports: [CommonModule, RouterLink, EntradaEstoqueFormComponent],
  templateUrl: './entrada-estoque-page.html',
  styleUrl: './entrada-estoque-page.scss',
})
export class EntradaEstoquePageComponent {
  private readonly router = inject(Router);

  private readonly estoqueService = inject(MovimentacaoEstoqueService);

  private readonly toastService = inject(ToastService);

  salvar(request: EntradaEstoqueRequest): void {
    this.estoqueService.entrada(request).subscribe({
      next: () => {
        this.toastService.success('Entrada de estoque registrada com sucesso.');

        this.router.navigate(['/estoque']);
      },

      error: (erro) => {
        const mensagem =
          erro?.error?.message ??
          erro?.error?.errors?.[0] ??
          'Erro ao registrar entrada de estoque.';

        this.toastService.error(mensagem);
      },
    });
  }
}
