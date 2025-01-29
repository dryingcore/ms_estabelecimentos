import { FastifyInstance } from 'fastify';
import { createEstabelecimento, getEstabelecimento } from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/estabelecimentos/:categoria', getEstabelecimento);
  fastify.post('/insert/estabelecimento', createEstabelecimento);
}
