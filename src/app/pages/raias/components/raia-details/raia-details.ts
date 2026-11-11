import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { RaiaResponse } from '../../../../core/models/raia-response';

@Component({
  selector: 'app-raia-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raia-details.html',
  styleUrl: './raia-details.scss',
})
export class RaiaDetailsComponent {
  @Input()
  raia?: RaiaResponse;
}
