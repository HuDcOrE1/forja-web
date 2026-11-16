import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Output, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { ProdutoResponse } from '../../../core/models/produto-response';

import { ProdutoService } from '../../../core/services/produto.service';

import { PageResponse } from '../../../core/models/page-response';

@Component({
  selector: 'app-produto-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-lookup.html',
  styleUrl: './produto-lookup.scss',
})
export class ProdutoLookupComponent {
  private readonly produtoService = inject(ProdutoService);

  @Output()
  produtoSelecionado = new EventEmitter<ProdutoResponse>();

  termo = '';

  produtos: ProdutoResponse[] = [];

  produto?: ProdutoResponse;

  private readonly pesquisa$ = new Subject<string>();

  constructor() {
    this.pesquisa$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((termo: string) => {
      if (termo.length < 2) {
        this.produtos = [];

        return;
      }

      this.produtoService
        .listar(0, 10, termo)
        .subscribe((resultado: PageResponse<ProdutoResponse>) => {
          this.produtos = resultado.content;
        });
    });
  }

  pesquisar(): void {
    this.pesquisa$.next(this.termo);
  }

  selecionar(produto: ProdutoResponse): void {
    this.produto = produto;

    this.termo = `${produto.codigo} - ${produto.nome}`;

    this.produtos = [];

    this.produtoSelecionado.emit(produto);
  }
}
