import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioDetailsComponent } from '../components/usuario-details/usuario-details';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioResponse } from '../../../core/models/usuario-response';

@Component({
  selector: 'app-usuario-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, UsuarioDetailsComponent],
  templateUrl: './usuario-details-page.html',
  styleUrl: './usuario-details-page.scss',
})
export class UsuarioDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly usuarioService = inject(UsuarioService);

  usuario?: UsuarioResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.usuarioService.obterPorId(id).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}
