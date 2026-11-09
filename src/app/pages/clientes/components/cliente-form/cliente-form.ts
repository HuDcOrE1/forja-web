import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ClienteResponse
} from '../../../../core/models/cliente-response';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss'
})
export class ClienteFormComponent {

  private readonly fb =
    inject(FormBuilder);

  private _cliente?: ClienteResponse;

  @Input()
  set cliente(value: ClienteResponse | undefined) {

    this._cliente = value;

    if (!value) {
      return;
    }

    this.form.patchValue({

      nome: value.nome,

      cpf: value.cpf,

      email: value.email,

      telefone: value.telefone,

      ativo: value.ativo
    });
  }

  get cliente(): ClienteResponse | undefined {

    return this._cliente;
  }

  @Output()
  salvar =
    new EventEmitter<any>();

  form = this.fb.group({

    nome: [
      '',
      [
        Validators.required,
        Validators.maxLength(150)
      ]
    ],

    cpf: [
      '',
      [
        Validators.required,
        Validators.maxLength(14)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    telefone: [
      '',
      [
        Validators.required
      ]
    ],

    ativo: [true]
  });

 

  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    console.log(
      'FORM ENVIADO',
      this.form.getRawValue()
    );

    this.salvar.emit(
      this.form.getRawValue()
    );
  }

}