import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { VendaDetailComponent } from '../venda-detail/venda-detail';

import { VendaCancelamentoDialogComponent } from '../venda-cancelamento-dialog/venda-cancelamento-dialog';

import { VendaService } from '../../../../core/services/venda.service';

import { VendaResponse } from '../../../../core/models/venda-response';

import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-venda-details-page',
  standalone: true,
  imports: [CommonModule, VendaDetailComponent, VendaCancelamentoDialogComponent],
  templateUrl: './venda-details-page.html',
  styleUrl: './venda-details-page.scss',
})
export class VendaDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly vendaService = inject(VendaService);

  private readonly toastService = inject(ToastService);

  venda?: VendaResponse;

  carregando = true;

  exibirDialogCancelamento = false;

  ngOnInit(): void {
    this.carregarVenda();
  }

  private carregarVenda(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.carregando = false;

      return;
    }

    this.vendaService.obterPorId(id).subscribe({
      next: (venda) => {
        this.venda = venda;

        this.carregando = false;
      },

      error: () => {
        this.carregando = false;
      },
    });
  }

  abrirCancelamento(): void {
    this.exibirDialogCancelamento = true;
  }

  fecharCancelamento(): void {
    this.exibirDialogCancelamento = false;
  }

  confirmarCancelamento(motivo: string): void {
    if (!this.venda?.id) {
      return;
    }

    this.vendaService.cancelar(this.venda.id, motivo).subscribe({
      next: (venda) => {
        this.venda = venda;

        this.exibirDialogCancelamento = false;

        this.toastService.success('Venda cancelada com sucesso.');
      },

      error: (erro) => {
        const mensagem = erro?.error?.erro ?? 'Erro ao cancelar venda.';

        this.toastService.error(mensagem);
      },
    });
  }
}
