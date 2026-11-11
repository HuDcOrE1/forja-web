import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { CategoriaProdutoResponse } from '../../../../core/models/categoria-produto-response';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.scss',
})
export class CategoriaListComponent {
  @Input()
  categorias: CategoriaProdutoResponse[] = [];
}
