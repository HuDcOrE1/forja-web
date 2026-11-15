import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Output, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { ClienteResponse } from '../../../core/models/cliente-response';

import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-lookup.html',
  styleUrl: './cliente-lookup.scss',
})
export class ClienteLookupComponent {
  private readonly clienteService = inject(ClienteService);

  @Output()
  clienteSelecionado = new EventEmitter<ClienteResponse>();

  termo = '';

  clientes: ClienteResponse[] = [];

  cliente?: ClienteResponse;

  private readonly pesquisa$ = new Subject<string>();

  constructor() {
    this.pesquisa$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((termo) => {
      if (termo.length < 3) {
        this.clientes = [];

        return;
      }

      this.clienteService.pesquisar(termo).subscribe((resultado) => {
        this.clientes = resultado;
      });
    });
  }

  pesquisar(): void {
    this.pesquisa$.next(this.termo);
  }

  selecionar(cliente: ClienteResponse): void {
    this.cliente = cliente;

    this.termo = cliente.nome;

    this.clientes = [];

    this.clienteSelecionado.emit(cliente);
  }
}
