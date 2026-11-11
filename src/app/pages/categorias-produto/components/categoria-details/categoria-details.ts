import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { CategoriaProdutoResponse } from '../../../../core/models/categoria-produto-response';

@Component({
  selector: 'app-categoria-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-details.html',
  styleUrl: './categoria-details.scss',
})
export class CategoriaDetailsComponent {
  @Input()
  categoria?: CategoriaProdutoResponse;
}
