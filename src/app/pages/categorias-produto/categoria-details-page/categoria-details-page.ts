import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { CategoriaDetailsComponent } from '../components/categoria-details/categoria-details';
import { CategoriaProdutoService } from '../../../core/services/categoria-produto';
import { CategoriaProdutoResponse } from '../../../core/models/categoria-produto-response';

@Component({
  selector: 'app-categoria-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoriaDetailsComponent],
  templateUrl: './categoria-details-page.html',
  styleUrl: './categoria-details-page.scss',
})
export class CategoriaDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly categoriaService = inject(CategoriaProdutoService);

  categoria?: CategoriaProdutoResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.categoriaService.obterPorId(id).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }
}
