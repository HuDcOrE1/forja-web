import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { AgendamentoDetailsComponent } from '../components/agendamento-details/agendamento-details';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { AgendamentoResponse } from '../../../core/models/agendamento-response';

@Component({
  selector: 'app-agendamento-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, AgendamentoDetailsComponent],
  templateUrl: './agendamento-details-page.html',
  styleUrl: './agendamento-details-page.scss',
})
export class AgendamentoDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly agendamentoService = inject(AgendamentoService);

  agendamento?: AgendamentoResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.agendamentoService.obterPorId(id).subscribe((response) => {
      this.agendamento = response;
    });
  }
}
