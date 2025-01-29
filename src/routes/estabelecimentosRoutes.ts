import { FastifyInstance } from 'fastify';
import {
  createEstabelecimento,
  getEstabelecimentos,
  getTiposEstabelecimentos,
} from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/estabelecimentos', getEstabelecimentos);
  fastify.get('/estabelecimentos/tipos', getTiposEstabelecimentos);
  fastify.post('/estabelecimentos', createEstabelecimento);
}
