import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { VendaResponse } from '../../../../core/models/venda-response';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venda-list.html',
  styleUrl: './venda-list.scss',
})
export class VendaListComponent {
  @Input()
  vendas: VendaResponse[] = [];
}
