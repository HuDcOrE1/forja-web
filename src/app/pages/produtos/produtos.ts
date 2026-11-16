import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ProdutoResponse } from '../../core/models/produto-response';

import { ProdutoService } from '../../core/services/produto.service';

import { ProdutoListComponent } from './components/produto-list/produto-list';

import { PageResponse } from '../../core/models/page-response';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProdutoListComponent],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class ProdutosComponent implements OnInit {
  private readonly produtoService = inject(ProdutoService);

  produtos: ProdutoResponse[] = [];

  termoPesquisa = '';

  statusEstoque = '';

  paginaAtual = 0;

  itensPorPagina = 20;

  totalPaginas = 0;

  totalElementos = 0;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService
      .listar(
        this.paginaAtual,
        this.itensPorPagina,
        this.termoPesquisa,
        this.statusEstoque || undefined,
      )
      .subscribe((response: PageResponse<ProdutoResponse>) => {
        this.produtos = response.content;

        this.totalPaginas = response.totalPages;

        this.totalElementos = response.totalElements;
      });
  }

  pesquisar(): void {
    this.paginaAtual = 0;

    this.carregarProdutos();
  }

  filtrarStatus(): void {
    this.paginaAtual = 0;

    this.carregarProdutos();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;

      this.carregarProdutos();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;

      this.carregarProdutos();
    }
  }
}
