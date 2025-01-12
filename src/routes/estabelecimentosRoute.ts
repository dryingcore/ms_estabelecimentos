import { FastifyInstance } from 'fastify';
import { getAllEstabelecimentos } from '../controllers/estabelecimentoController';

export async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/getAllEstabelecimentos', getAllEstabelecimentos);
}
