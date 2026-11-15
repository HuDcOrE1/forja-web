import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { VendaService } from '../../../core/services/venda.service';
import { VendaResponse } from '../../../core/models/venda-response';
import { VendaDetailComponent } from '../components/venda-detail/venda-detail';

@Component({
  selector: 'app-venda-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, VendaDetailComponent],
  templateUrl: './venda-details-page.html',
  styleUrl: './venda-details-page.scss',
})
export class VendaDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly vendaService = inject(VendaService);

  venda?: VendaResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.vendaService.obterPorId(id).subscribe((venda) => {
      this.venda = venda;
    });
  }
}
