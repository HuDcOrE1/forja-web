import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { RaiaResponse } from '../../core/models/raia-response';

import { RaiaService } from '../../core/services/raia.service';

import { RaiaListComponent } from './components/raia-list/raia-list';

@Component({
  selector: 'app-raias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RaiaListComponent],
  templateUrl: './raias.html',
  styleUrl: './raias.scss',
})
export class RaiasComponent implements OnInit {
  private readonly raiaService = inject(RaiaService);

  raias: RaiaResponse[] = [];

  raiasFiltradas: RaiaResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarRaias();
  }

  private carregarRaias(): void {
    this.raiaService.listar().subscribe((response) => {
      this.raias = response;

      this.raiasFiltradas = [...response];
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.raiasFiltradas = [...this.raias];

      this.paginaAtual = 1;

      return;
    }

    this.raiasFiltradas = this.raias.filter(
      (raia) =>
        String(raia.numero).includes(termo) || (raia.descricao ?? '').toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get raiasPaginadas(): RaiaResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.raiasFiltradas.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.raiasFiltradas.length / this.itensPorPagina));
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
