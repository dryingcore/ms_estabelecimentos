export interface createEstabelecimentoDTO {
  id?: number;
  cnpj: string;
  endereco: string;
  nome: string;
  aberto: boolean;
  website?: string;
  promocao_rolando: boolean;
  tipo_estabelecimento: string;
}
