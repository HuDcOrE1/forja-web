import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { UsuarioResponse } from '../../../../core/models/usuario-response';

@Component({
  selector: 'app-usuario-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-details.html',
  styleUrl: './usuario-details.scss',
})
export class UsuarioDetailsComponent {
  @Input()
  usuario?: UsuarioResponse;
}
