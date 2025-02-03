export interface createEstabelecimentoDTO {
  id?: number;
  cnpj: string;
  endereco: string;
  nome: string;
  aberto: boolean;
  website?: string;
  senha_acesso?: string;
  promocao_rolando: boolean;
  tipo_estabelecimento: string;
}
