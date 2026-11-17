export interface UsuarioRequest {
  nome: string;

  email: string;

  senha: string;

  ativo: boolean;

  perfis: number[];
}
