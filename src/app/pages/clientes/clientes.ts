import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ClienteResponse
} from '../../core/models/cliente-response';

import { RouterLink }
from '@angular/router';

import {
  ClienteListComponent
} from './components/cliente-list/cliente-list';
import { ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ClienteListComponent
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class ClientesComponent
implements OnInit {

  private readonly clienteService =
    inject(ClienteService);

  clientes: ClienteResponse[] = [];

  ngOnInit(): void {

    this.carregarClientes();
  }

  private carregarClientes(): void {

    this.clienteService
      .listar()
      .subscribe((response: ClienteResponse[]) => {
        console.log('CLIENTES', response);
        this.clientes = response;
      });
  }

}