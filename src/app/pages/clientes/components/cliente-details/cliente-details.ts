import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ClienteResponse } from '../../../../core/models/cliente-response';

@Component({
  selector: 'app-cliente-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-details.html',
  styleUrl: './cliente-details.scss',
})
export class ClienteDetailsComponent {
  @Input()
  cliente?: ClienteResponse;
}
