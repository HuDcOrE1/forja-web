import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../core/services/usuario.service';

import { UsuarioResponse } from '../../core/models/usuario-response';

import { UsuarioListComponent } from './components/usuario-list/usuario-list';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, UsuarioListComponent],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class UsuariosComponent implements OnInit {
  private readonly usuarioService = inject(UsuarioService);

  usuarios: UsuarioResponse[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  private carregarUsuarios(): void {
    this.usuarioService.listar().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
