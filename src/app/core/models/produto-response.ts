export interface ProdutoResponse {
  id: number;

  codigo: string;

  nome: string;

  descricao: string;

  categoriaId: number;

  categoriaNome: string;

  marca: string;

  unidadeMedida: string;

  estoqueAtual: number;

  estoqueMinimo: number;

  valorCusto: number;

  valorVenda: number;

  ativo: boolean;
}
