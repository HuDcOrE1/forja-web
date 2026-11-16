import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Output, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-venda-cancelamento-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './venda-cancelamento-dialog.html',
  styleUrl: './venda-cancelamento-dialog.scss',
})
export class VendaCancelamentoDialogComponent {
  private readonly fb = inject(FormBuilder);

  @Output()
  confirmar = new EventEmitter<string>();

  @Output()
  cancelar = new EventEmitter<void>();

  form = this.fb.group({
    motivo: ['', [Validators.required, Validators.maxLength(500)]],
  });

  confirmarCancelamento(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.confirmar.emit(this.form.getRawValue().motivo ?? '');
  }

  fechar(): void {
    this.cancelar.emit();
  }
}
