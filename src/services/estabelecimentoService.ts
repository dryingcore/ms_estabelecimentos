import { estabelecimentoDTO } from './../dto/estabelecimentoDTO';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getEstabelecimento(pathVariable?: string) {
    switch (pathVariable) {
      case 'todos':
        return await prisma.estabelecimento.findMany({
          include: { promocoes: true, horarios: true, tipo_estabelecimento: true },
        });
      case 'abertos':
        return await prisma.estabelecimento.findMany({
          where: { aberto: true },
          include: { promocoes: true, horarios: true, tipo_estabelecimento: true },
        });
      case 'fechados':
        return await prisma.estabelecimento.findMany({
          where: { aberto: false },
          include: { promocoes: true, horarios: true, tipo_estabelecimento: true },
        });
      case 'restaurante':
        return await prisma.estabelecimento.findMany({
          where: { fk_tipo_estabelecimento: 1 },
          include: { promocoes: true, horarios: true, tipo_estabelecimento: true },
        });
      default:
        return {
          message: `Estabelecimento com a categoria ${pathVariable} não encontrado`,
        };
    }
  }

  static async insertEstabelecimento(estabelecimento: estabelecimentoDTO) {
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
          foto_local: estabelecimento.foto_local,
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
