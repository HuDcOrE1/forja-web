import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { CategoriaProdutoResponse } from '../../core/models/categoria-produto-response';
import { ClienteResponse } from '../../core/models/cliente-response';
import {
  FormatoExportacao,
  RelatorioAgendamento,
  RelatorioClientes,
  RelatorioEstoque,
  RelatorioRaia,
  RelatorioVenda,
  TipoRelatorio,
} from '../../core/models/relatorio.model';
import { RaiaResponse } from '../../core/models/raia-response';
import { CategoriaProdutoService } from '../../core/services/categoria-produto';
import { ClienteService } from '../../core/services/cliente.service';
import { RaiaService } from '../../core/services/raia.service';
import { RelatorioService } from '../../core/services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.scss',
})
export class RelatoriosComponent implements OnInit {
  private readonly relatorioService = inject(RelatorioService);
  private readonly clienteService = inject(ClienteService);
  private readonly raiaService = inject(RaiaService);
  private readonly categoriaService = inject(CategoriaProdutoService);

  readonly tamanhoPagina = 20;
  readonly formasPagamento = [
    'PIX',
    'DINHEIRO',
    'DEBITO',
    'CREDITO',
    'TRANSFERENCIA',
    'BOLETO',
    'OUTROS',
  ];
  readonly statusVendas = ['FINALIZADA', 'CANCELADA'];

  tipoRelatorio: TipoRelatorio = 'vendas';
  paginaAtual = 0;
  carregando = false;
  exportando = false;
  erro = '';
  erroOpcoes = '';

  clienteId: number | null = null;
  formaPagamento = '';
  statusVenda = '';
  inicio = '';
  fim = '';

  categoriaId: number | null = null;
  estoqueMinimo: number | null = null;

  clienteAgendamentoId: number | null = null;
  raiaId: number | null = null;
  statusAgendamento = '';

  clientesDisponiveis: ClienteResponse[] = [];
  raiasDisponiveis: RaiaResponse[] = [];
  categoriasDisponiveis: CategoriaProdutoResponse[] = [];

  vendas: RelatorioVenda[] = [];
  estoque: RelatorioEstoque[] = [];
  clientes?: RelatorioClientes;
  agendamentos: RelatorioAgendamento[] = [];
  raias: RelatorioRaia[] = [];

  ngOnInit(): void {
    this.carregarOpcoes();
    this.carregarRelatorio();
  }

  selecionarRelatorio(tipo: TipoRelatorio): void {
    this.tipoRelatorio = tipo;
    this.paginaAtual = 0;
    this.carregarRelatorio();
  }

  aplicarFiltros(): void {
    this.paginaAtual = 0;
    this.carregarRelatorio();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarRelatorio();
    }
  }

  proximaPagina(): void {
    if (this.temProximaPagina) {
      this.paginaAtual++;
      this.carregarRelatorio();
    }
  }

  get temPaginacao(): boolean {
    return ['vendas', 'estoque', 'agendamentos'].includes(this.tipoRelatorio);
  }

  get temProximaPagina(): boolean {
    return this.quantidadeAtual === this.tamanhoPagina;
  }

  get quantidadeAtual(): number {
    switch (this.tipoRelatorio) {
      case 'vendas':
        return this.vendas.length;
      case 'estoque':
        return this.estoque.length;
      case 'agendamentos':
        return this.agendamentos.length;
      default:
        return 0;
    }
  }

  exportar(formato: FormatoExportacao): void {
    if (this.tipoRelatorio !== 'vendas' && this.tipoRelatorio !== 'estoque') {
      return;
    }

    const tipo = this.tipoRelatorio;
    this.exportando = true;
    this.erro = '';

    this.relatorioService.exportar(tipo, formato).subscribe({
      next: (arquivo) => {
        const url = URL.createObjectURL(arquivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${tipo}.${formato}`;
        link.click();
        URL.revokeObjectURL(url);
        this.exportando = false;
      },
      error: (error: unknown) => {
        this.erro = this.mensagemErro(error);
        this.exportando = false;
      },
    });
  }

  private carregarOpcoes(): void {
    this.clienteService.listar().subscribe({
      next: (clientes) => (this.clientesDisponiveis = clientes),
      error: () => (this.erroOpcoes = 'Não foi possível carregar a lista de clientes.'),
    });

    this.raiaService.listar().subscribe({
      next: (raias) => (this.raiasDisponiveis = raias),
      error: () => (this.erroOpcoes = 'Não foi possível carregar a lista de raias.'),
    });

    this.categoriaService.listar().subscribe({
      next: (categorias) => (this.categoriasDisponiveis = categorias),
      error: () => (this.erroOpcoes = 'Não foi possível carregar as categorias.'),
    });
  }

  private carregarRelatorio(): void {
    this.erro = '';

    switch (this.tipoRelatorio) {
      case 'vendas':
        this.vendas = [];
        this.executar(
          this.relatorioService.vendas({
            clienteId: this.clienteId,
            formaPagamento: this.formaPagamento,
            status: this.statusVenda,
            inicio: this.inicio ? `${this.inicio}T00:00:00` : '',
            fim: this.fim ? `${this.fim}T23:59:59.999999999` : '',
            page: this.paginaAtual,
            size: this.tamanhoPagina,
          }),
          (resultado) => (this.vendas = resultado),
        );
        break;

      case 'estoque':
        this.estoque = [];
        this.executar(
          this.relatorioService.estoque({
            categoriaId: this.categoriaId,
            estoqueMinimo: this.estoqueMinimo,
            page: this.paginaAtual,
            size: this.tamanhoPagina,
          }),
          (resultado) => (this.estoque = resultado),
        );
        break;

      case 'clientes':
        this.clientes = undefined;
        this.executar(this.relatorioService.clientes(), (resultado) => (this.clientes = resultado));
        break;

      case 'agendamentos':
        this.agendamentos = [];
        this.executar(
          this.relatorioService.agendamentos({
            clienteId: this.clienteAgendamentoId,
            raiaId: this.raiaId,
            status: this.statusAgendamento,
            page: this.paginaAtual,
            size: this.tamanhoPagina,
          }),
          (resultado) => (this.agendamentos = resultado),
        );
        break;

      case 'raias':
        this.raias = [];
        this.executar(this.relatorioService.raias(), (resultado) => (this.raias = resultado));
        break;
    }
  }

  private executar<T>(requisicao: Observable<T>, aoSucesso: (resultado: T) => void): void {
    this.carregando = true;

    requisicao.subscribe({
      next: (resultado) => {
        aoSucesso(resultado);
        this.carregando = false;
      },
      error: (error: unknown) => {
        this.erro = this.mensagemErro(error);
        this.carregando = false;
      },
    });
  }

  private mensagemErro(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.status
        ? `Falha ao consultar o relatório (HTTP ${error.status}).`
        : 'Não foi possível conectar à API.';
    }

    return 'Ocorreu um erro ao consultar o relatório.';
  }

  fecharCalendario(event: Event): void {
    (event.target as HTMLInputElement).blur();
  }
}
