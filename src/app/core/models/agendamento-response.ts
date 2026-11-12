export interface AgendamentoResponse {
  id: number;

  clienteId: number;

  cliente: string;

  raiaId: number;

  raia: string;

  dataInicio: string;

  dataFim: string;

  status: string;

  observacao: string;
}
