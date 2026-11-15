import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { VendaResponse } from '../../core/models/venda-response';

import { VendaService } from '../../core/services/venda.service';

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

  vendas: VendaResponse[] = [];

  vendasFiltradas: VendaResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarVendas();
  }

  private carregarVendas(): void {
    this.vendaService.listar().subscribe({
      next: (response: VendaResponse[]) => {
        this.vendas = response;

        this.vendasFiltradas = [...response];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.vendasFiltradas = [...this.vendas];

      this.paginaAtual = 1;

      return;
    }

    this.vendasFiltradas = this.vendas.filter(
      (venda) =>
        venda.cliente.toLowerCase().includes(termo) ||
        venda.usuario.toLowerCase().includes(termo) ||
        venda.status.toString().toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get vendasPaginadas(): VendaResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.vendasFiltradas.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.vendasFiltradas.length / this.itensPorPagina));
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
