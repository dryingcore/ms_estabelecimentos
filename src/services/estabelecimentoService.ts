import { estabelecimentoDTO } from './../dto/estabelecimentoDTO';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getEstabelecimento(pathVariable?: string) {
    // Caso não haja pathVariable, retorna todos os estabelecimentos
    if (!pathVariable) {
      return await prisma.estabelecimento.findMany();
    }

    // Primeiro tenta buscar por tipo de estabelecimento
    const tipo = await prisma.tipo_estabelecimento.findFirst({
      where: { nome: pathVariable },
    });

    if (tipo) {
      // Se encontrar um tipo, retorna os estabelecimentos daquele tipo
      return await prisma.estabelecimento.findMany({
        where: { fk_tipo_estabelecimento: tipo.id },
      });
    }

    // Filtros para categorias especiais como "abertos" e "fechados"
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

    // Se não encontrar nenhuma correspondência, retorna um erro de "categoria não encontrada"
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
