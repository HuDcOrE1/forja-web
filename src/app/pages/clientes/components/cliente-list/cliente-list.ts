import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClienteResponse } from '../../../../core/models/cliente-response';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss'
})
export class ClienteListComponent {

  @Input()
  clientes: ClienteResponse[] = [];

}