import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ClienteResponse } from '../../core/models/cliente-response';

import { PageResponse } from '../../core/models/page-response';

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

  termoPesquisa = '';

  ativo: string = 'true';

  paginaAtual = 0;

  itensPorPagina = 20;

  totalPaginas = 0;

  totalElementos = 0;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const filtroAtivo = this.ativo === '' ? undefined : this.ativo === 'true';

    this.clienteService
      .listar(this.paginaAtual, this.itensPorPagina, this.termoPesquisa, filtroAtivo)
      .subscribe((response: PageResponse<ClienteResponse>) => {
        this.clientes = response.content;

        this.totalPaginas = response.totalPages;

        this.totalElementos = response.totalElements;
      });
  }

  pesquisar(): void {
    this.paginaAtual = 0;

    this.carregarClientes();
  }

  filtrarStatus(): void {
    this.paginaAtual = 0;

    this.carregarClientes();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;

      this.carregarClientes();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;

      this.carregarClientes();
    }
  }
}
