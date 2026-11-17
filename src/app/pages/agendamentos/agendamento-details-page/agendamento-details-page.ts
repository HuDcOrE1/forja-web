import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { AgendamentoDetailsComponent } from '../components/agendamento-details/agendamento-details';

import { AgendamentoService } from '../../../core/services/agendamento.service';

import { AgendamentoResponse } from '../../../core/models/agendamento-response';

import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-agendamento-details-page',
  standalone: true,
  imports: [CommonModule, AgendamentoDetailsComponent],
  templateUrl: './agendamento-details-page.html',
  styleUrl: './agendamento-details-page.scss',
})
export class AgendamentoDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly agendamentoService = inject(AgendamentoService);

  private readonly toastService = inject(ToastService);

  agendamento?: AgendamentoResponse;

  carregando = true;

  ngOnInit(): void {
    this.carregarAgendamento();
  }

  private carregarAgendamento(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.carregando = false;

      return;
    }

    this.agendamentoService.obterPorId(id).subscribe({
      next: (response) => {
        this.agendamento = response;

        this.carregando = false;
      },

      error: () => {
        this.carregando = false;
      },
    });
  }

  finalizar(): void {
    if (!this.agendamento?.id) {
      return;
    }

    this.agendamentoService.finalizar(this.agendamento.id).subscribe({
      next: () => {
        this.toastService.success('Agendamento finalizado com sucesso.');

        this.carregarAgendamento();
      },

      error: () => {
        this.toastService.error('Erro ao finalizar agendamento.');
      },
    });
  }

  cancelar(): void {
    if (!this.agendamento?.id) {
      return;
    }

    const confirmar = confirm('Deseja realmente cancelar este agendamento?');

    if (!confirmar) {
      return;
    }

    this.agendamentoService.cancelar(this.agendamento.id).subscribe({
      next: () => {
        this.toastService.success('Agendamento cancelado com sucesso.');

        this.carregarAgendamento();
      },

      error: () => {
        this.toastService.error('Erro ao cancelar agendamento.');
      },
    });
  }
}
