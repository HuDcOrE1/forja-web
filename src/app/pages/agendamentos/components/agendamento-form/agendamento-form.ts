import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AgendamentoResponse } from '../../../../core/models/agendamento-response';

import { ClienteResponse } from '../../../../core/models/cliente-response';

import { RaiaResponse } from '../../../../core/models/raia-response';

import { ClienteService } from '../../../../core/services/cliente.service';

import { RaiaService } from '../../../../core/services/raia.service';

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agendamento-form.html',
  styleUrl: './agendamento-form.scss',
})
export class AgendamentoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly clienteService = inject(ClienteService);

  private readonly raiaService = inject(RaiaService);

  clientes: ClienteResponse[] = [];

  raias: RaiaResponse[] = [];

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
  }

  get agendamento(): AgendamentoResponse | undefined {
    return this._agendamento;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    clienteId: [null as number | null, Validators.required],

    raiaId: [null as number | null, Validators.required],

    dataInicio: ['', Validators.required],

    dataFim: ['', Validators.required],

    observacao: [''],
  });

  ngOnInit(): void {
    this.carregarClientes();

    this.carregarRaias();
  }

  private carregarClientes(): void {
    this.clienteService.listar().subscribe((response: ClienteResponse[]) => {
      this.clientes = response;
    });
  }

  private carregarRaias(): void {
    this.raiaService.listar().subscribe((response: RaiaResponse[]) => {
      this.raias = response;
    });
  }

  onSubmit(): void {
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
