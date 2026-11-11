import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProdutoResponse } from '../../../../core/models/produto-response';

import { CategoriaProdutoResponse } from '../../../../core/models/categoria-produto-response';

import { MoedaMaskUtil } from '../../../../shared/utils/moeda-mask.util';
import { CategoriaProdutoService } from '../../../../core/services/categoria-produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss',
})
export class ProdutoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly categoriaService = inject(CategoriaProdutoService);

  categorias: CategoriaProdutoResponse[] = [];

  private _produto?: ProdutoResponse;

  @Input()
  set produto(value: ProdutoResponse | undefined) {
    this._produto = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      codigo: value.codigo,

      nome: value.nome,

      descricao: value.descricao,

      categoriaId: value.categoriaId,

      marca: value.marca,

      unidadeMedida: value.unidadeMedida,

      estoqueAtual: value.estoqueAtual,

      estoqueMinimo: value.estoqueMinimo,

      valorCusto: value.valorCusto?.toString(),

      valorVenda: value.valorVenda?.toString(),

      ativo: value.ativo,
    });
  }

  get produto(): ProdutoResponse | undefined {
    return this._produto;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    codigo: ['', [Validators.required, Validators.maxLength(50)]],

    nome: ['', [Validators.required, Validators.maxLength(255)]],

    descricao: [''],

    categoriaId: [null as number | null, Validators.required],

    marca: [''],

    unidadeMedida: [''],

    estoqueAtual: [0, [Validators.required, Validators.min(0)]],

    estoqueMinimo: [0, [Validators.required, Validators.min(0)]],

    valorCusto: ['', Validators.required],

    valorVenda: ['', Validators.required],

    ativo: [true],
  });

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaService.listar().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  aplicarMascaraMoedaCusto(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        valorCusto: MoedaMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  aplicarMascaraMoedaVenda(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        valorVenda: MoedaMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const formValue = this.form.getRawValue();

    this.salvar.emit({
      ...formValue,

      valorCusto: this.converterMoeda(formValue.valorCusto),

      valorVenda: this.converterMoeda(formValue.valorVenda),
    });
  }

  private converterMoeda(valor: string | null): number {
    if (!valor) {
      return 0;
    }

    return Number(valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  }
}
