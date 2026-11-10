import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ClienteResponse } from '../../core/models/cliente-response';

import { ClienteService } from '../../core/services/cliente.service';

import { ClienteListComponent } from './components/cliente-list/cliente-list';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ClienteListComponent],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class ClientesComponent implements OnInit {
  private readonly clienteService = inject(ClienteService);

  clientes: ClienteResponse[] = [];

  clientesFiltrados: ClienteResponse[] = [];

  termoPesquisa = '';

  paginaAtual = 1;

  itensPorPagina = 10;

  ngOnInit(): void {
    this.carregarClientes();
  }

  private carregarClientes(): void {
    this.clienteService.listar().subscribe((response: ClienteResponse[]) => {
      this.clientes = response;

      this.clientesFiltrados = [...response];
    });
  }

  pesquisar(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();

    if (!termo) {
      this.clientesFiltrados = [...this.clientes];

      this.paginaAtual = 1;

      return;
    }

    this.clientesFiltrados = this.clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.cpf.includes(termo) ||
        cliente.email.toLowerCase().includes(termo),
    );

    this.paginaAtual = 1;
  }

  get clientesPaginados(): ClienteResponse[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    const fim = inicio + this.itensPorPagina;

    return this.clientesFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.clientesFiltrados.length / this.itensPorPagina));
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
