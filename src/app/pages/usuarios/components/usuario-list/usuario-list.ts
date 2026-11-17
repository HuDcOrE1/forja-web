import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { UsuarioResponse } from '../../../../core/models/usuario-response';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.scss',
})
export class UsuarioListComponent {
  @Input()
  usuarios: UsuarioResponse[] = [];
}
