import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { VendaResponse } from '../../../../core/models/venda-response';

@Component({
  selector: 'app-venda-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venda-detail.html',
  styleUrl: './venda-detail.scss',
})
export class VendaDetailComponent {
  @Input()
  venda?: VendaResponse;
}
