import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MovimentacaoEstoqueService } from '../../core/services/movimentacao-estoque.service';

import { MovimentacaoEstoqueResponse } from '../../core/models/movimentacao-estoque-response';

import { PageResponse } from '../../core/models/page-response';

import { HistoricoEstoqueListComponent } from './components/historico-estoque-list/historico-estoque-list';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, RouterLink, HistoricoEstoqueListComponent],
  templateUrl: './estoque.html',
  styleUrl: './estoque.scss',
})
export class EstoqueComponent implements OnInit {
  private readonly estoqueService = inject(MovimentacaoEstoqueService);

  movimentacoes: MovimentacaoEstoqueResponse[] = [];

  paginaAtual = 0;

  itensPorPagina = 20;

  totalPaginas = 0;

  totalElementos = 0;

  ngOnInit(): void {
    this.carregarHistorico();
  }

  private carregarHistorico(): void {
    this.estoqueService
      .historico(this.paginaAtual, this.itensPorPagina)
      .subscribe((response: PageResponse<MovimentacaoEstoqueResponse>) => {
        this.movimentacoes = response.content;

        this.totalPaginas = response.totalPages;

        this.totalElementos = response.totalElements;
      });
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;

      this.carregarHistorico();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;

      this.carregarHistorico();
    }
  }
}
