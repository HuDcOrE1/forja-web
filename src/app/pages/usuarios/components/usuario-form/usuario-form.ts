import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsuarioResponse } from '../../../../core/models/usuario-response';

import { PerfilResponse } from '../../../../core/models/perfil-response';

import { PerfilService } from '../../../../core/services/perfil.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly perfilService = inject(PerfilService);

  private _usuario?: UsuarioResponse;

  perfisDisponiveis: PerfilResponse[] = [];

  @Input()
  set usuario(value: UsuarioResponse | undefined) {
    this._usuario = value;

    if (!value) {
      return;
    }

    this.form.patchValue({
      nome: value.nome,
      email: value.email,
      ativo: value.ativo,
    });

    this.sincronizarPerfis();
  }

  get usuario(): UsuarioResponse | undefined {
    return this._usuario;
  }

  @Output()
  salvar = new EventEmitter<any>();

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(255)]],

    email: ['', [Validators.required, Validators.email]],

    senha: [''],

    ativo: [true],

    perfis: [[] as number[], Validators.required],
  });

  ngOnInit(): void {
    this.carregarPerfis();
  }

  private carregarPerfis(): void {
    this.perfilService.listar().subscribe((perfis) => {
      this.perfisDisponiveis = perfis;

      this.sincronizarPerfis();
    });
  }

  private sincronizarPerfis(): void {
    if (!this.usuario || this.perfisDisponiveis.length === 0) {
      return;
    }

    const perfisSelecionados = this.perfisDisponiveis
      .filter((perfil) => this.usuario!.perfis.includes(perfil.nome))
      .map((perfil) => perfil.id);

    this.form.patchValue({
      perfis: perfisSelecionados,
    });
  }

  alterarPerfil(perfilId: number, marcado: boolean): void {
    const perfis = [...(this.form.value.perfis ?? [])];

    if (marcado) {
      if (!perfis.includes(perfilId)) {
        perfis.push(perfilId);
      }
    } else {
      const index = perfis.indexOf(perfilId);

      if (index >= 0) {
        perfis.splice(index, 1);
      }
    }

    this.form.patchValue({
      perfis,
    });

    this.form.controls.perfis.markAsTouched();
  }

  get editando(): boolean {
    return !!this.usuario;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.salvar.emit(this.form.getRawValue());
  }
}
