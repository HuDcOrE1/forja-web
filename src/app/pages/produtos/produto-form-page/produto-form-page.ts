import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProdutoFormComponent } from '../components/produto-form/produto-form';
import { ProdutoService } from '../../../core/services/produto.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ProdutoResponse } from '../../../core/models/produto-response';
import { ProdutoRequest } from '../../../core/models/produto-request';

@Component({
  selector: 'app-produto-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProdutoFormComponent],
  templateUrl: './produto-form-page.html',
  styleUrl: './produto-form-page.scss',
})
export class ProdutoFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly produtoService = inject(ProdutoService);

  private readonly toastService = inject(ToastService);

  produto?: ProdutoResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.produtoService.obterPorId(Number(id)).subscribe((produto) => {
      this.produto = produto;
    });
  }

  salvar(produto: ProdutoRequest): void {
    if (this.editando && this.produto) {
      this.produtoService.atualizar(this.produto.id, produto).subscribe({
        next: () => {
          this.toastService.success('Produto atualizado com sucesso.');

          this.router.navigate(['/produtos', this.produto!.id]);
        },

        error: (erro) => {
          const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao atualizar produto.';

          this.toastService.error(mensagem);
        },
      });

      return;
    }

    this.produtoService.cadastrar(produto).subscribe({
      next: () => {
        this.toastService.success('Produto cadastrado com sucesso.');

        this.router.navigate(['/produtos']);
      },

      error: (erro) => {
        const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao cadastrar produto.';

        this.toastService.error(mensagem);
      },
    });
  }
}
