import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteDetailsComponent } from '../cliente-details/cliente-details';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ClienteResponse } from '../../../../core/models/cliente-response';

@Component({
  selector: 'app-cliente-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ClienteDetailsComponent],
  templateUrl: './cliente-details-page.html',
  styleUrl: './cliente-details-page.scss',
})
export class ClienteDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly clienteService = inject(ClienteService);

  cliente?: ClienteResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.clienteService.obterPorId(id).subscribe((cliente) => {
        this.cliente = cliente;
      });
    }
  }
}
