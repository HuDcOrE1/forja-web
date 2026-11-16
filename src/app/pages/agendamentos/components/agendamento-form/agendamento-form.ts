import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AgendamentoResponse } from '../../../../core/models/agendamento-response';

import { ClienteResponse } from '../../../../core/models/cliente-response';

import { RaiaResponse } from '../../../../core/models/raia-response';

import { RaiaService } from '../../../../core/services/raia.service';

import { ClienteLookupComponent } from '../../../../shared/components/cliente-lookup/cliente-lookup';

import { ToastService } from '../../../../shared/services/toast.service';
import { ClienteService } from '../../../../core/services/cliente.service';

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClienteLookupComponent],
  templateUrl: './agendamento-form.html',
  styleUrl: './agendamento-form.scss',
})
export class AgendamentoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly raiaService = inject(RaiaService);

  private readonly toastService = inject(ToastService);

  private readonly clienteService = inject(ClienteService);

  raias: RaiaResponse[] = [];

  clienteSelecionado?: ClienteResponse;

  private _agendamento?: AgendamentoResponse;

  @Input()
  set agendamento(value: AgendamentoResponse | undefined) {
    this._agendamento = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      clienteId: value.clienteId,
      raiaId: value.raiaId,
      dataInicio: this.formatarData(value.dataInicio),
      dataFim: this.formatarData(value.dataFim),
      observacao: value.observacao,
    });

    this.clienteService.obterPorId(value.clienteId).subscribe((cliente) => {
      this.clienteSelecionado = cliente;
    });
  }

  get agendamento(): AgendamentoResponse | undefined {
    return this._agendamento;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    clienteId: this.fb.control<number | null>(null, Validators.required),

    raiaId: this.fb.control<number | null>(null, Validators.required),

    dataInicio: ['', Validators.required],

    dataFim: ['', Validators.required],

    observacao: [''],
  });

  ngOnInit(): void {
    this.carregarRaias();
  }

  selecionarCliente(cliente: ClienteResponse): void {
    this.clienteSelecionado = cliente;

    this.form.patchValue({
      clienteId: cliente.id,
    });

    this.form.controls.clienteId.markAsTouched();
  }

  private carregarRaias(): void {
    this.raiaService.listar().subscribe((response: RaiaResponse[]) => {
      this.raias = response;
    });
  }

  onSubmit(): void {
    if (!this.form.value.clienteId) {
      this.toastService.error('Selecione um cliente.');

      return;
    }

    if (!this.form.value.raiaId) {
      this.toastService.error('Selecione uma raia.');

      return;
    }

    if (!this.form.value.dataInicio) {
      this.toastService.error('Informe a data de início.');

      return;
    }

    if (!this.form.value.dataFim) {
      this.toastService.error('Informe a data de fim.');

      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }

  private formatarData(data: string): string {
    if (!data) {
      return '';
    }

    return data.substring(0, 16);
  }
}
