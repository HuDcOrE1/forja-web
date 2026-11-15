export interface PagamentoVenda {
  formaPagamento: 'PIX' | 'DINHEIRO' | 'DEBITO' | 'CREDITO' | 'TRANSFERENCIA' | 'BOLETO' | 'OUTROS';

  valor: number;
}
