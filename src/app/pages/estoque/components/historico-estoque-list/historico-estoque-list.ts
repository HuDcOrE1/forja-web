import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { MovimentacaoEstoqueResponse } from '../../../../core/models/movimentacao-estoque-response';

@Component({
  selector: 'app-historico-estoque-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-estoque-list.html',
  styleUrl: './historico-estoque-list.scss',
})
export class HistoricoEstoqueListComponent {
  @Input()
  movimentacoes: MovimentacaoEstoqueResponse[] = [];
}
