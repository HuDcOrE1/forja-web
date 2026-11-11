import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriaFormComponent } from '../components/categoria-form/categoria-form';
import { CategoriaProdutoService } from '../../../core/services/categoria-produto';
import { ToastService } from '../../../shared/services/toast.service';
import { CategoriaProdutoResponse } from '../../../core/models/categoria-produto-response';
import { CategoriaProdutoRequest } from '../../../core/models/categoria-produto-request';

@Component({
  selector: 'app-categoria-form-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoriaFormComponent],
  templateUrl: './categoria-form-page.html',
  styleUrl: './categoria-form-page.scss',
})
export class CategoriaFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly categoriaService = inject(CategoriaProdutoService);

  private readonly toastService = inject(ToastService);

  categoria?: CategoriaProdutoResponse;

  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editando = true;

    this.categoriaService.obterPorId(Number(id)).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }

  salvar(categoria: CategoriaProdutoRequest): void {
    if (this.editando && this.categoria) {
      this.categoriaService.atualizar(this.categoria.id, categoria).subscribe({
        next: () => {
          this.toastService.success('Categoria atualizada com sucesso.');

          this.router.navigate(['/categorias-produto', this.categoria!.id]);
        },

        error: (erro) => {
          const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao atualizar categoria.';

          this.toastService.error(mensagem);
        },
      });

      return;
    }

    this.categoriaService.cadastrar(categoria).subscribe({
      next: () => {
        this.toastService.success('Categoria cadastrada com sucesso.');

        this.router.navigate(['/categorias-produto']);
      },

      error: (erro) => {
        const mensagem = erro?.error?.errors?.[0] ?? 'Erro ao cadastrar categoria.';

        this.toastService.error(mensagem);
      },
    });
  }
}
