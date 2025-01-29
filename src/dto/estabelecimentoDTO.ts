export interface estabelecimentoDTO {
  id?: number;
  cnpj: string;
  endereco: string;
  nome: string;
  aberto: boolean;
  website?: string;
  promocao_rolando: boolean;
  foto_local: string;
  tipo_estabelecimento: string;
}
