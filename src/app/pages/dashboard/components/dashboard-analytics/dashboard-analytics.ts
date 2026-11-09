import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard-analytics.html',
  styleUrl: './dashboard-analytics.scss'
})
export class DashboardAnalyticsComponent {

  @Input() faturamentoDiarioChart: any;

  @Input() topProdutosChart: any;

  @Input() topClientesChart: any;

  @Input() receitaCategoriaChart: any;

  @Input() chartOptions: any;

  @Input() lineChartType: any;

  @Input() barChartType: any;

  @Input() doughnutChartType: any;

}
