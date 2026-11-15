import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import { VendaService } from '../../../core/services/venda.service';
import { ToastService } from '../../../shared/services/toast.service';
import { VendaRequest } from '../../../core/models/venda-request';
import { VendaFormComponent } from '../components/venda-form/venda-form';

@Component({
  selector: 'app-venda-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, VendaFormComponent],
  templateUrl: './venda-form-page.html',
  styleUrl: './venda-form-page.scss',
})
export class VendaFormPageComponent {
  private readonly vendaService = inject(VendaService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  salvar(request: VendaRequest): void {
    this.vendaService.cadastrar(request).subscribe({
      next: () => {
        this.toastService.success('Venda realizada com sucesso.');

        this.router.navigate(['/vendas']);
      },

      error: (erro) => {
        const mensagem = erro?.error?.erro ?? 'Erro ao realizar venda.';

        this.toastService.error(mensagem);
      },
    });
  }
}
