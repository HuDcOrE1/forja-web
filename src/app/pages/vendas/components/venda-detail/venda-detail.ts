import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { VendaResponse } from '../../../../core/models/venda-response';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-venda-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venda-detail.html',
  styleUrl: './venda-detail.scss',
})
export class VendaDetailComponent {
  private readonly authService = inject(AuthService);

  @Input()
  venda?: VendaResponse;

  @Output()
  cancelar = new EventEmitter<void>();

  get podeCancelar(): boolean {
    return this.authService.hasRole('ROLE_ADMIN', 'ROLE_GERENTE');
  }

  solicitarCancelamento(): void {
    this.cancelar.emit();
  }
}
