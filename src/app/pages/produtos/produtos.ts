import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ProdutoResponse } from '../../core/models/produto-response';

import { ProdutoService } from '../../core/services/produto.service';

import { ProdutoListComponent } from './components/produto-list/produto-list';

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

  produtosFiltrados: ProdutoResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos(): void {
    this.produtoService.listar().subscribe((response: ProdutoResponse[]) => {
      this.produtos = response;

      this.produtosFiltrados = [...response];
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.produtosFiltrados = [...this.produtos];

      this.paginaAtual = 1;

      return;
    }

    this.produtosFiltrados = this.produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.codigo.toLowerCase().includes(termo) ||
        produto.categoriaNome.toLowerCase().includes(termo) ||
        (produto.marca ?? '').toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get produtosPaginados(): ProdutoResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.produtosFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.produtosFiltrados.length / this.itensPorPagina));
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }
}
