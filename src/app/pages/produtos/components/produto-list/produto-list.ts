import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { ProdutoResponse } from '../../../../core/models/produto-response';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.scss',
})
export class ProdutoListComponent {
  @Input()
  produtos: ProdutoResponse[] = [];

  estoqueCritico(produto: ProdutoResponse): boolean {
    return produto.estoqueAtual > 0 && produto.estoqueAtual <= produto.estoqueMinimo;
  }

  semEstoque(produto: ProdutoResponse): boolean {
    return produto.estoqueAtual <= 0;
  }

  estoqueSaudavel(produto: ProdutoResponse): boolean {
    return produto.estoqueAtual > produto.estoqueMinimo;
  }
}
