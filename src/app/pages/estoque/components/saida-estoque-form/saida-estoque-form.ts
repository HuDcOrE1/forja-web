import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProdutoResponse } from '../../../../core/models/produto-response';

import { ProdutoService } from '../../../../core/services/produto.service';

@Component({
  selector: 'app-saida-estoque-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './saida-estoque-form.html',
  styleUrl: './saida-estoque-form.scss',
})
export class SaidaEstoqueFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly produtoService = inject(ProdutoService);

  produtos: ProdutoResponse[] = [];

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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }
}
