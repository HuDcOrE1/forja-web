import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { AgendamentoResponse } from '../../../../core/models/agendamento-response';

import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-agendamento-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamento-details.html',
  styleUrl: './agendamento-details.scss',
})
export class AgendamentoDetailsComponent {
  private readonly authService = inject(AuthService);

  @Input()
  agendamento?: AgendamentoResponse;

  @Output()
  finalizar = new EventEmitter<void>();

  @Output()
  cancelar = new EventEmitter<void>();

  get podeFinalizar(): boolean {
    return this.authService.hasRole('ROLE_ADMIN', 'ROLE_GERENTE', 'ROLE_INSTRUTOR');
  }

  get podeCancelar(): boolean {
    return this.authService.hasRole('ROLE_ADMIN', 'ROLE_GERENTE', 'ROLE_ATENDENTE');
  }

  solicitarFinalizacao(): void {
    this.finalizar.emit();
  }

  solicitarCancelamento(): void {
    this.cancelar.emit();
  }
}
