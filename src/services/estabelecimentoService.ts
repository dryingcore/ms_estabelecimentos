import { estabelecimentoDTO } from './../dto/estabelecimentoDTO';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getEstabelecimento(pathVariable?: string) {
    if (!pathVariable) {
      return await prisma.estabelecimento.findMany();
    }

    const tipo = await prisma.tipo_estabelecimento.findFirst({
      where: { nome: pathVariable },
    });

    if (tipo) {
      return await prisma.estabelecimento.findMany({
        where: { fk_tipo_estabelecimento: tipo.id },
      });
    }

    const filtrosEspeciais: Record<string, object> = {
      abertos: { aberto: true },
      fechados: { aberto: false },
    };

    // Verifica se a pathVariable está nos filtros especiais
    const filtro = filtrosEspeciais[pathVariable];

    if (filtro) {
      return await prisma.estabelecimento.findMany({
        where: filtro,
      });
    }

    return {
      message: `Categoria '${pathVariable}' não encontrada.`,
    };
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
