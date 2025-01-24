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
          message: `Estabelecimento com a categoria ${pathVariable} não encontrado`,
        };
    }
  }
}
