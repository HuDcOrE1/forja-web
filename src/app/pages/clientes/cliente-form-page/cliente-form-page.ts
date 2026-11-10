import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ClienteResponse } from '../../../core/models/cliente-response';

import { ClienteService } from '../../../core/services/cliente.service';

import { ClienteFormComponent } from '../components/cliente-form/cliente-form';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-cliente-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ClienteFormComponent],
  templateUrl: './cliente-form-page.html',
  styleUrl: './cliente-form-page.scss',
})
export class ClienteFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly clienteService = inject(ClienteService);

  private readonly toastService = inject(ToastService);

  cliente?: ClienteResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.clienteService.obterPorId(Number(id)).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  salvar(cliente: any): void {
    console.log('SALVAR RECEBIDO', cliente);

    if (this.editando && this.cliente) {
      this.clienteService.atualizar(this.cliente.id, cliente).subscribe({
        next: () => {
          this.toastService.success('Cliente atualizado com sucesso.');

          this.router.navigate(['/clientes', this.cliente!.id]);
        },

        error: (erro) => {
          const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao atualizar cliente.';

          this.toastService.error(mensagem);
        },
      });

      return;
    }

    this.clienteService.cadastrar(cliente).subscribe({
      next: () => {
        this.toastService.success('Cliente cadastrado com sucesso.');

        this.router.navigate(['/clientes']);
      },

      error: (erro) => {
        const mensagem = erro.error?.errors?.[0] ?? 'Erro ao cadastrar cliente.';

        this.toastService.error(mensagem);
      },
    });
  }
}
