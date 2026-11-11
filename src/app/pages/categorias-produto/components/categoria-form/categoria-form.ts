import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CategoriaProdutoResponse } from '../../../../core/models/categoria-produto-response';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.scss',
})
export class CategoriaFormComponent {
  private readonly fb = inject(FormBuilder);

  private _categoria?: CategoriaProdutoResponse;

  @Input()
  set categoria(value: CategoriaProdutoResponse | undefined) {
    this._categoria = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      nome: value.nome,

      descricao: value.descricao,

      ativo: value.ativo,
    });
  }

  get categoria(): CategoriaProdutoResponse | undefined {
    return this._categoria;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(100)]],

    descricao: [''],

    ativo: [true],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }
}
