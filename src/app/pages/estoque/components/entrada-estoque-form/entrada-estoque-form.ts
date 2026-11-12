import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProdutoResponse } from '../../../../core/models/produto-response';

import { ProdutoService } from '../../../../core/services/produto.service';

import { ProdutoAutocompleteComponent } from '../../../../shared/components/produto-autocomplete/produto-autocomplete';

@Component({
  selector: 'app-entrada-estoque-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProdutoAutocompleteComponent],
  templateUrl: './entrada-estoque-form.html',
  styleUrl: './entrada-estoque-form.scss',
})
export class EntradaEstoqueFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly produtoService = inject(ProdutoService);

  produtos: ProdutoResponse[] = [];

  produtoSelecionado?: ProdutoResponse;

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    produtoId: [null as number | null, Validators.required],

    quantidade: [1, [Validators.required, Validators.min(1)]],

    observacao: [''],
  });

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos(): void {
    this.produtoService.listar().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  selecionarProduto(produtoId: number): void {
    this.form.patchValue({
      produtoId: produtoId,
    });

    this.produtoSelecionado = this.produtos.find((produto) => produto.id === produtoId);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }
}
