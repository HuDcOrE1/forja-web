import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { RaiaResponse } from '../../../../core/models/raia-response';

@Component({
  selector: 'app-raia-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './raia-list.html',
  styleUrl: './raia-list.scss',
})
export class RaiaListComponent {
  @Input()
  raias: RaiaResponse[] = [];
}
