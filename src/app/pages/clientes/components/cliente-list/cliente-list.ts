import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClienteResponse } from '../../../../core/models/cliente-response';
import { RouterLink } from '@angular/router';
import { CpfMaskUtil } from '../../../../shared/utils/cpf-mask.util';

import { TelefoneMaskUtil } from '../../../../shared/utils/telefone-mask.util';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss',
})
export class ClienteListComponent {
  protected readonly cpfMask = CpfMaskUtil;

  protected readonly telefoneMask = TelefoneMaskUtil;

  @Input()
  clientes: ClienteResponse[] = [];
}
