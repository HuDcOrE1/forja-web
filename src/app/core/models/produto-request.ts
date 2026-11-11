export interface ProdutoRequest {
  codigo: string;

  nome: string;

  descricao: string;

  categoriaId: number;

  marca: string;

  unidadeMedida: string;

  estoqueAtual: number;

  estoqueMinimo: number;

  valorCusto: number;

  valorVenda: number;

  ativo: boolean;
}
