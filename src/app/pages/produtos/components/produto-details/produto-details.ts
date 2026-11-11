import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { ProdutoResponse } from '../../../../core/models/produto-response';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-details.html',
  styleUrl: './produto-details.scss',
})
export class ProdutoDetailsComponent {
  @Input()
  produto?: ProdutoResponse;
}
