import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { CategoriaProdutoResponse } from '../../core/models/categoria-produto-response';

import { CategoriaListComponent } from './components/categoria-list/categoria-list';
import { CategoriaProdutoService } from '../../core/services/categoria-produto';

@Component({
  selector: 'app-categorias-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CategoriaListComponent],
  templateUrl: './categorias-produto.html',
  styleUrl: './categorias-produto.scss',
})
export class CategoriasProdutoComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaProdutoService);

  categorias: CategoriaProdutoResponse[] = [];

  categoriasFiltradas: CategoriaProdutoResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaService.listar().subscribe((response) => {
      this.categorias = response;

      this.categoriasFiltradas = [...response];
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.categoriasFiltradas = [...this.categorias];

      this.paginaAtual = 1;

      return;
    }

    this.categoriasFiltradas = this.categorias.filter(
      (categoria) =>
        categoria.nome.toLowerCase().includes(termo) ||
        (categoria.descricao ?? '').toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get categoriasPaginadas(): CategoriaProdutoResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.categoriasFiltradas.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.categoriasFiltradas.length / this.itensPorPagina));
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
