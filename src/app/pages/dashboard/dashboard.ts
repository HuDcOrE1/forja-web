import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  Legend,
  Tooltip,
  Title,
  ChartConfiguration,
  ChartType,
} from 'chart.js';

import { DashboardResponse } from '../../core/models/dashboard-response';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardKpisComponent } from './components/dashboard-kpis/dashboard-kpis';

import { DashboardAnalyticsComponent } from './components/dashboard-analytics/dashboard-analytics';

import { DashboardStrategicComponent } from './components/dashboard-strategic/dashboard-strategic';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  Legend,
  Tooltip,
  Title,
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardKpisComponent,
    DashboardAnalyticsComponent,
    DashboardStrategicComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  dashboard?: DashboardResponse;

  lineChartType: ChartType = 'line';

  barChartType: ChartType = 'bar';

  doughnutChartType: ChartType = 'doughnut';

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },
  };

  faturamentoDiarioChart: ChartConfiguration<'line'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Faturamento Diário',
        data: [],
        tension: 0.3,
        borderColor: '#f59e0b',
      },
    ],
  };

  topProdutosChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Top Produtos',
        data: [],
        backgroundColor: '#f59e0b',
      },
    ],
  };

  topClientesChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Top Clientes',
        data: [],
        backgroundColor: '#2563eb',
      },
    ],
  };

  receitaCategoriaChart: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Receita por Categoria',
        data: [],
        backgroundColor: ['#f59e0b', '#2563eb', '#10b981', '#ef4444', '#8b5cf6'],
      },
    ],
  };

  receitaFormaPagamentoChart: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Receita por Forma de Pagamento',
        data: [],
        backgroundColor: ['#f59e0b', '#2563eb', '#10b981', '#ef4444', '#8b5cf6'],
      },
    ],
  };

  ocupacaoRaiasChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Ocupação das Raias',
        data: [],
        backgroundColor: '#10b981',
      },
    ],
  };

  saudeEstoque: any;

  conversaoOperacional: any;

  ngOnInit(): void {
    this.carregarDashboard();

    this.carregarFaturamentoDiario();

    this.carregarTopProdutos();

    this.carregarTopClientes();

    this.carregarReceitaCategoria();

    this.carregarReceitaFormaPagamento();

    this.carregarOcupacaoRaias();

    this.carregarSaudeEstoque();

    this.carregarConversaoOperacional();
  }

  private carregarDashboard(): void {
    this.dashboardService.obterDashboard().subscribe((response: DashboardResponse) => {
      this.dashboard = response;
    });
  }

  private carregarFaturamentoDiario(): void {
    this.dashboardService.faturamentoDiario().subscribe((response: any[]) => {
      this.faturamentoDiarioChart = {
        labels: response.map((item) => item.data),

        datasets: [
          {
            label: 'Faturamento Diário',
            data: response.map((item) => item.valor),

            tension: 0.3,

            borderColor: '#f59e0b',
          },
        ],
      };
    });
  }

  private carregarTopProdutos(): void {
    this.dashboardService.topProdutos().subscribe((response: any[]) => {
      this.topProdutosChart = {
        labels: response.map((item) => item.produto),

        datasets: [
          {
            label: 'Top Produtos',

            data: response.map((item) => item.quantidade),

            backgroundColor: '#f59e0b',
          },
        ],
      };
    });
  }
  private carregarTopClientes(): void {
    this.dashboardService.topClientes().subscribe((response: any[]) => {
      this.topClientesChart = {
        labels: response.map((item) => item.cliente),

        datasets: [
          {
            label: 'Top Clientes',

            data: response.map((item) => item.quantidadeCompras),

            backgroundColor: '#2563eb',
          },
        ],
      };
    });
  }

  private carregarReceitaCategoria(): void {
    this.dashboardService.receitaCategoria().subscribe((response: any[]) => {
      this.receitaCategoriaChart = {
        labels: response.map((item) => item.categoria),

        datasets: [
          {
            label: 'Receita por Categoria',

            data: response.map((item) => item.valor),

            backgroundColor: ['#f59e0b', '#2563eb', '#10b981', '#ef4444', '#8b5cf6'],
          },
        ],
      };
    });
  }

  private carregarReceitaFormaPagamento(): void {
    this.dashboardService.receitaFormaPagamento().subscribe((response: any[]) => {
      this.receitaFormaPagamentoChart = {
        labels: response.map((item) => item.formaPagamento),

        datasets: [
          {
            label: 'Receita por Forma de Pagamento',

            data: response.map((item) => item.valor),

            backgroundColor: ['#f59e0b', '#2563eb', '#10b981', '#ef4444', '#8b5cf6'],
          },
        ],
      };
    });
  }
  private carregarOcupacaoRaias(): void {
    this.dashboardService.ocupacaoRaias().subscribe((response: any[]) => {
      this.ocupacaoRaiasChart = {
        labels: response.map((item) => item.raia),

        datasets: [
          {
            label: 'Ocupação das Raias',

            data: response.map((item) => item.quantidadeAgendamentos),

            backgroundColor: '#10b981',
          },
        ],
      };
    });
  }

  private carregarSaudeEstoque(): void {
    this.dashboardService.saudeEstoque().subscribe((response) => {
      this.saudeEstoque = response;
    });
  }

  private carregarConversaoOperacional(): void {
    this.dashboardService.conversaoOperacional().subscribe((response) => {
      this.conversaoOperacional = response;
    });
  }
}
