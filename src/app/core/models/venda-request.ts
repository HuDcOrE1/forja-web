import { ItemVenda } from './item-venda.model.ts';
import { PagamentoVenda } from './pagamento-venda.model.ts';

export interface VendaRequest {
  clienteId: number;

  valorDesconto?: number;

  valorAcrescimo?: number;

  itens: ItemVenda[];

  pagamentos: PagamentoVenda[];
}
