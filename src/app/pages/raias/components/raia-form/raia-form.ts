import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RaiaResponse } from '../../../../core/models/raia-response';

@Component({
  selector: 'app-raia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './raia-form.html',
  styleUrl: './raia-form.scss',
})
export class RaiaFormComponent {
  private readonly fb = inject(FormBuilder);

  private _raia?: RaiaResponse;

  @Input()
  set raia(value: RaiaResponse | undefined) {
    this._raia = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      numero: value.numero,

      descricao: value.descricao,

      ativa: value.ativa,
    });
  }

  get raia(): RaiaResponse | undefined {
    return this._raia;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    numero: [1, [Validators.required, Validators.min(1)]],

    descricao: ['', [Validators.required, Validators.maxLength(255)]],

    ativa: [true],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }
}
