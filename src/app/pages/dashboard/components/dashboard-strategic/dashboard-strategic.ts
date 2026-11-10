import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-strategic',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-strategic.html',
  styleUrl: './dashboard-strategic.scss',
})
export class DashboardStrategicComponent {
  @Input() receitaFormaPagamentoChart: any;

  @Input() ocupacaoRaiasChart: any;

  @Input() saudeEstoque: any;

  @Input() conversaoOperacional: any;

  @Input() chartOptions: any;

  @Input() barChartType: any;

  @Input() doughnutChartType: any;
}
