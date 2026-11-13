export interface RelatorioVenda {
  vendaId: number;
  cliente: string | null;
  usuario: string;
  valorTotal: number;
  formaPagamento: string;
  status: string;
  dataVenda: string;
}

export interface RelatorioEstoque {
  produtoId: number;
  codigo: string;
  produto: string;
  estoque: number;
  valorVenda: number;
  valorTotalEstoque: number;
}

export interface RelatorioClientes {
  totalClientes: number;
  clientesAtivos: number;
  clientesInativos: number;
}

export interface RelatorioAgendamento {
  id: number;
  cliente: string;
  raia: string;
  inicio: string;
  fim: string;
  status: string;
}

export interface RelatorioRaia {
  raiaId: number;
  raia: string;
  quantidadeAgendamentos: number;
}

export type FormatoExportacao = 'csv' | 'xlsx' | 'pdf';
export type TipoRelatorio = 'vendas' | 'estoque' | 'clientes' | 'agendamentos' | 'raias';
