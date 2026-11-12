import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { AgendamentoResponse } from '../../../../core/models/agendamento-response';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agendamento-list.html',
  styleUrl: './agendamento-list.scss',
})
export class AgendamentoListComponent {
  @Input()
  agendamentos: AgendamentoResponse[] = [];
}
