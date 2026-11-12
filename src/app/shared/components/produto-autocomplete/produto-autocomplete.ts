import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { ProdutoResponse } from '../../../core/models/produto-response';

@Component({
  selector: 'app-produto-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  templateUrl: './produto-autocomplete.html',
  styleUrl: './produto-autocomplete.scss',
})
export class ProdutoAutocompleteComponent {
  @Input()
  produtos: ProdutoResponse[] = [];

  @Output()
  produtoSelecionado = new EventEmitter<number>();

  filtro = '';

  get produtosFiltrados(): ProdutoResponse[] {
    const termo = this.filtro.toLowerCase().trim();

    if (!termo) {
      return this.produtos;
    }

    return this.produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(termo) || produto.codigo.toLowerCase().includes(termo),
    );
  }

  selecionar(produto: ProdutoResponse): void {
    this.filtro = `${produto.codigo} - ${produto.nome}`;

    this.produtoSelecionado.emit(produto.id);
  }
}
