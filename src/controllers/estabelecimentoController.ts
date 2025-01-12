import { FastifyReply, FastifyRequest } from 'fastify';
import { EstabelecimentoService } from '../services/estabelecimentoService';

export async function getAllEstabelecimentos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const estabelecimentos = await EstabelecimentoService.getAllEstabelecimentos();
    reply.send(estabelecimentos).status(200).send({ message: 'Estabelecimentos listados com sucesso!' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Internal server error' });
  }
}
