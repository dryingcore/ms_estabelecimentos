import { FastifyReply, FastifyRequest } from 'fastify';
import { EstabelecimentoService } from '../services/estabelecimentoService';

interface GetEstabelecimentoParams {
  categoria: string;
}

export async function getEstabelecimento(
  request: FastifyRequest<{ Params: GetEstabelecimentoParams }>,
  reply: FastifyReply,
) {
  try {
    const { categoria } = request.params;

    const estabelecimentos = await EstabelecimentoService.getEstabelecimento(categoria);

    return reply.status(200).send({
      message: 'Estabelecimentos listados com sucesso!',
      data: estabelecimentos,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}
