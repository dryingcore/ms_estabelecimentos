import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getAllEstabelecimentos() {
    return await prisma.estabelecimento.findMany();
  }

  static async getEstabelecimentoById(id: number) {
    return await prisma.estabelecimento.findUnique({ where: { id } });
  }
}
