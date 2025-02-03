import { createEstabelecimentoDTO } from './../dto/estabelecimentoDTO';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getEstabelecimentos() {
    return await prisma.estabelecimento.findMany();
  }

  static async getEstabelecimentosByCategoria(categoria: string) {
    return await prisma.estabelecimento.findMany({
      where: { tipo_estabelecimento: { nome: categoria } },
    });
  }

  static async createEstabelecimentoService(estabelecimento: createEstabelecimentoDTO) {
    try {
      const tipo = await prisma.tipo_estabelecimento.findFirst({
        where: { nome: estabelecimento.tipo_estabelecimento },
      });

      if (!tipo) {
        throw new Error(`Tipo de estabelecimento '${estabelecimento.tipo_estabelecimento}' não encontrado`);
      }

      return await prisma.estabelecimento.create({
        data: {
          cnpj: estabelecimento.cnpj,
          endereco: estabelecimento.endereco,
          nome: estabelecimento.nome,
          aberto: estabelecimento.aberto,
          website: estabelecimento.website,
          promocao_rolando: estabelecimento.promocao_rolando,
          fk_tipo_estabelecimento: tipo.id,
        },
      });
    } catch (error: any) {
      console.error('Erro ao inserir estabelecimento:', error.message);
      throw new Error(error.message || 'Erro ao criar estabelecimento');
    }
  }

  static async getTiposEstabelecimentos() {
    return await prisma.tipo_estabelecimento.findMany();
  }
}
