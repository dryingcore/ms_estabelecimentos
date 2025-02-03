import { hashPassword } from '../utils/hash';
import { createEstabelecimentoDTO } from '../dto/createEstabelecimentoDTO';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static getEstabelecimentos() {
    return prisma.estabelecimento.findMany();
  }

  static getEstabelecimentosByCategoria(categoria: string) {
    return prisma.estabelecimento.findMany({
      where: { tipo_estabelecimento: { nome: categoria } },
    });
  }

  static async createEstabelecimentoService(estabelecimento: createEstabelecimentoDTO) {
    try {
      // 🔍 Verifica se o CNPJ já existe no banco
      const existingEstabelecimento = await prisma.estabelecimento.findUnique({
        where: { cnpj: estabelecimento.cnpj },
      });

      if (existingEstabelecimento) {
        throw new Error('CNPJ já cadastrado');
      }

      // 🔍 Busca o tipo de estabelecimento
      const tipo = await prisma.tipo_estabelecimento.findFirst({
        where: { nome: estabelecimento.tipo_estabelecimento },
      });

      if (!tipo) {
        throw new Error(`Tipo de estabelecimento '${estabelecimento.tipo_estabelecimento}' não encontrado`);
      }

      // 🔒 Gera o hash da senha, se existir
      const hashedPassword = estabelecimento.senha_acesso ? await hashPassword(estabelecimento.senha_acesso) : null;

      // 🏪 Cria o estabelecimento no banco
      return prisma.estabelecimento.create({
        data: {
          cnpj: estabelecimento.cnpj,
          endereco: estabelecimento.endereco,
          nome: estabelecimento.nome,
          senha_acesso: hashedPassword,
          aberto: estabelecimento.aberto,
          website: estabelecimento.website,
          promocao_rolando: estabelecimento.promocao_rolando,
          fk_tipo_estabelecimento: tipo.id,
        },
      });
    } catch (error) {
      console.error('Erro ao inserir estabelecimento:', error);
      throw new Error(error instanceof Error ? error.message : 'Erro ao criar estabelecimento');
    }
  }

  static getTiposEstabelecimentos() {
    return prisma.tipo_estabelecimento.findMany();
  }
}
