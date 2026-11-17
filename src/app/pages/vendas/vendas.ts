import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { VendaResponse } from '../../core/models/venda-response';

import { PageResponse } from '../../core/models/page-response';

import { VendaService } from '../../core/services/venda.service';

import { ToastService } from '../../shared/services/toast.service';

import { VendaListComponent } from './components/venda-list/venda-list';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VendaListComponent],
  templateUrl: './vendas.html',
  styleUrl: './vendas.scss',
})
export class VendasComponent implements OnInit {
  private readonly vendaService = inject(VendaService);
  private readonly toastService = inject(ToastService);

  vendas: VendaResponse[] = [];

  termoPesquisa = '';

  status = '';

  paginaAtual = 0;

  itensPorPagina = 20;

  totalPaginas = 0;

  totalElementos = 0;

  ngOnInit(): void {
    this.carregarVendas();
  }

  private carregarVendas(): void {
    this.vendaService
      .listar(
        this.paginaAtual,
        this.itensPorPagina,
        undefined,
        this.status || undefined,
        this.termoPesquisa,
      )
      .subscribe({
        next: (response: PageResponse<VendaResponse>) => {
          this.vendas = response.content;

          this.totalPaginas = response.totalPages;

          this.totalElementos = response.totalElements;
        },

        error: (erro) => {
          const mensagem =
            erro?.error?.errors?.[0] ??
            erro?.error?.message ??
            'Não foi possível carregar as vendas.';

          this.toastService.error(mensagem);
        },
      });
  }

  pesquisar(): void {
    this.termoPesquisa = this.termoPesquisa.trim();

    this.paginaAtual = 0;

    this.carregarVendas();
  }

  filtrarStatus(): void {
    this.paginaAtual = 0;

    this.carregarVendas();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;

      this.carregarVendas();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;

      this.carregarVendas();
    }
  }
}
