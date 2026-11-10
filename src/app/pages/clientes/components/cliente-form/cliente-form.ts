import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClienteResponse } from '../../../../core/models/cliente-response';

import { CpfValidator } from '../../../../shared/validators/cpf.validator';

import { CpfMaskUtil } from '../../../../shared/utils/cpf-mask.util';

import { TelefoneMaskUtil } from '../../../../shared/utils/telefone-mask.util';

import { CepMaskUtil } from '../../../../shared/utils/cep-mask.util';

import { CpfUtil } from '../../../../shared/utils/cpf.util';

import { TelefoneUtil } from '../../../../shared/utils/telefone.util';

import { CepUtil } from '../../../../shared/utils/cep.util';

import { CepService } from '../../../../core/services/cep.service';

import { ViaCepResponse } from '../../../../core/models/viacep-response';

import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss',
})
export class ClienteFormComponent {
  private readonly fb = inject(FormBuilder);

  private readonly cepService = inject(CepService);

  private readonly toastService = inject(ToastService);

  private _cliente?: ClienteResponse;

  @Input()
  set cliente(value: ClienteResponse | undefined) {
    this._cliente = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      nome: value.nome,

      cpf: CpfMaskUtil.apply(value.cpf ?? ''),

      email: value.email,

      telefone: TelefoneMaskUtil.apply(value.telefone ?? ''),

      ativo: value.ativo,

      cep: CepMaskUtil.apply(value.cep ?? ''),

      logradouro: value.logradouro,

      numero: value.numero,

      complemento: value.complemento,

      bairro: value.bairro,

      cidade: value.cidade,

      uf: value.uf,
    });
  }

  get cliente(): ClienteResponse | undefined {
    return this._cliente;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],

    cpf: ['', [Validators.required, CpfValidator.validar()]],

    email: ['', [Validators.required, Validators.email]],

    telefone: ['', [Validators.required]],

    cep: [''],

    logradouro: [''],

    numero: [''],

    complemento: [''],

    bairro: [''],

    cidade: [''],

    uf: [''],

    ativo: [true],
  });

  aplicarMascaraCpf(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        cpf: CpfMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  aplicarMascaraTelefone(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        telefone: TelefoneMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  aplicarMascaraCep(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        cep: CepMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const formValue = this.form.getRawValue();

    this.salvar.emit({
      ...formValue,

      cpf: CpfUtil.onlyNumbers(formValue.cpf ?? ''),

      telefone: TelefoneUtil.onlyNumbers(formValue.telefone ?? ''),

      cep: CepUtil.onlyNumbers(formValue.cep ?? ''),
    });
  }

  buscarCep(): void {
    const cep = CepUtil.onlyNumbers(this.form.controls.cep.value ?? '');

    if (cep.length !== 8) {
      this.toastService.warning('CEP deve possuir 8 dígitos.');

      return;
    }

    this.cepService.buscarCep(cep).subscribe({
      next: (response: ViaCepResponse) => {
        if (response.erro) {
          this.limparEndereco();
          this.toastService.error('CEP não encontrado.');

          return;
        }

        this.form.patchValue({
          logradouro: response.logradouro,

          complemento: response.complemento,

          bairro: response.bairro,

          cidade: response.localidade,

          uf: response.uf,
        });
      },

      error: () => {
        this.limparEndereco();

        this.toastService.error('Erro ao consultar CEP.');
      },
    });
  }

  private limparEndereco(): void {
    this.form.patchValue({
      logradouro: '',

      complemento: '',

      bairro: '',

      cidade: '',

      uf: '',
    });
  }
}
