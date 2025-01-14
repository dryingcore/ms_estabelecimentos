import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EstabelecimentoService {
  static async getAllEstabelecimentos() {
    return await prisma.estabelecimento.findMany({
      include: { promocoes: true, horarios: true, tipo_estabelecimento: true },
    });
  }
}
