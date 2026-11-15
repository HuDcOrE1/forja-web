import { ItemVenda } from './item-venda.model.ts';
import { PagamentoVenda } from './pagamento-venda.model.ts';
import { StatusVenda } from './status-venda.enum.ts';

export interface VendaResponse {
  id: number;

  clienteId: number;
  cliente: string;

  usuarioId: number;
  usuario: string;

  valorBruto: number;

  valorDesconto: number;

  valorAcrescimo: number;

  valorLiquido: number;

  status: StatusVenda;

  criadoEm: string;

  itens: ItemVenda[];

  pagamentos: PagamentoVenda[];
}
