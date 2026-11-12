import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AgendamentoFormComponent } from '../components/agendamento-form/agendamento-form';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AgendamentoResponse } from '../../../core/models/agendamento-response';
import { AgendamentoRequest } from '../../../core/models/agendamento-request';

@Component({
  selector: 'app-agendamento-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, AgendamentoFormComponent],
  templateUrl: './agendamento-form-page.html',
  styleUrl: './agendamento-form-page.scss',
})
export class AgendamentoFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly agendamentoService = inject(AgendamentoService);

  private readonly toastService = inject(ToastService);

  agendamento?: AgendamentoResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.agendamentoService.obterPorId(Number(id)).subscribe((response) => {
      this.agendamento = response;
    });
  }

  salvar(request: AgendamentoRequest): void {
    if (this.editando && this.agendamento) {
      this.agendamentoService.atualizar(this.agendamento.id, request).subscribe({
        next: () => {
          this.toastService.success('Agendamento atualizado com sucesso.');

          this.router.navigate(['/agendamentos', this.agendamento!.id]);
        },

        error: (erro) => {
          const mensagem =
            erro?.error?.message ?? erro?.error?.errors?.[0] ?? 'Erro ao atualizar agendamento.';

          this.toastService.error(mensagem);
        },
      });

      return;
    }

    this.agendamentoService.cadastrar(request).subscribe({
      next: () => {
        this.toastService.success('Agendamento criado com sucesso.');

        this.router.navigate(['/agendamentos']);
      },

      error: (erro) => {
        const mensagem = erro?.error?.message ?? erro?.error?.erro ?? 'Erro ao criar agendamento.';

        this.toastService.error(mensagem);
      },
    });
  }
}
