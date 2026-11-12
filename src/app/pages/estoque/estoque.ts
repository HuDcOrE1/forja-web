import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MovimentacaoEstoqueService } from '../../core/services/movimentacao-estoque.service';

import { MovimentacaoEstoqueResponse } from '../../core/models/movimentacao-estoque-response';

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

  ngOnInit(): void {
    this.carregarHistorico();
  }

  private carregarHistorico(): void {
    this.estoqueService.historico().subscribe((response) => {
      this.movimentacoes = response;
    });
  }
}
