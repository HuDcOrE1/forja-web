export interface DashboardResponse {
  clientesAtivos: number;

  produtosAtivos: number;

  totalVendas: number;

  valorTotalVendas: number;

  ticketMedio: number;

  produtoMaisVendido: string;

  quantidadeProdutoMaisVendido: number;

  clienteMaisComprador: string;

  quantidadeComprasCliente: number;

  receitaHoje: number;

  receitaMes: number;

  agendamentosAtivos: number;

  raiaMaisUtilizada: string;

  quantidadeAgendamentosRaia: number;

  raiasAtivas: number;

  valorTotalEstoque: number;
}
