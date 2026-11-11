import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProdutoDetailsComponent } from '../components/produto-details/produto-details';
import { ProdutoService } from '../../../core/services/produto.service';
import { ProdutoResponse } from '../../../core/models/produto-response';

@Component({
  selector: 'app-produto-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProdutoDetailsComponent],
  templateUrl: './produto-details-page.html',
  styleUrl: './produto-details-page.scss',
})
export class ProdutoDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly produtoService = inject(ProdutoService);

  produto?: ProdutoResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.produtoService.obterPorId(id).subscribe((produto) => {
      this.produto = produto;
    });
  }
}
