import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { AgendamentoResponse } from '../../core/models/agendamento-response';

import { AgendamentoService } from '../../core/services/agendamento.service';

import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AgendamentoListComponent],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.scss',
})
export class AgendamentosComponent implements OnInit {
  private readonly agendamentoService = inject(AgendamentoService);

  agendamentos: AgendamentoResponse[] = [];

  agendamentosFiltrados: AgendamentoResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  private carregarAgendamentos(): void {
    this.agendamentoService.listar().subscribe((response: AgendamentoResponse[]) => {
      this.agendamentos = response;

      this.agendamentosFiltrados = [...response];
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.agendamentosFiltrados = [...this.agendamentos];

      this.paginaAtual = 1;

      return;
    }

    this.agendamentosFiltrados = this.agendamentos.filter(
      (agendamento) =>
        agendamento.cliente.toLowerCase().includes(termo) ||
        agendamento.raia.toLowerCase().includes(termo) ||
        agendamento.status.toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get agendamentosPaginados(): AgendamentoResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.agendamentosFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.agendamentosFiltrados.length / this.itensPorPagina));
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
