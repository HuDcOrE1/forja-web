import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DashboardResponse } from '../../../../core/models/dashboard-response';

@Component({
  selector: 'app-dashboard-kpis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-kpis.html',
  styleUrl: './dashboard-kpis.scss',
})
export class DashboardKpisComponent {
  @Input()
  dashboard?: DashboardResponse;
}
