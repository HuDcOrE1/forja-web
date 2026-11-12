import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { AgendamentoResponse } from '../../../../core/models/agendamento-response';

@Component({
  selector: 'app-agendamento-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamento-details.html',
  styleUrl: './agendamento-details.scss',
})
export class AgendamentoDetailsComponent {
  @Input()
  agendamento?: AgendamentoResponse;
}
