import { FastifyInstance } from 'fastify';
import { getEstabelecimento } from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/estabelecimentos/:categoria', getEstabelecimento);
}
