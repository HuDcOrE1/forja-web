import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { RaiaDetailsComponent } from '../components/raia-details/raia-details';
import { RaiaService } from '../../../core/services/raia.service';
import { RaiaResponse } from '../../../core/models/raia-response';

@Component({
  selector: 'app-raia-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RaiaDetailsComponent],
  templateUrl: './raia-details-page.html',
  styleUrl: './raia-details-page.scss',
})
export class RaiaDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly raiaService = inject(RaiaService);

  raia?: RaiaResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.raiaService.obterPorId(id).subscribe((raia) => {
      this.raia = raia;
    });
  }
}
