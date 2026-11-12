export interface MovimentacaoEstoqueResponse {
  id: number;

  produtoId: number;

  produto: string;

  tipo: string;

  quantidade: number;

  observacao: string;

  criadoEm: string;
}
