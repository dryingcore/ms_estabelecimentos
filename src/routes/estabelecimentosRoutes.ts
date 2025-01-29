import { FastifyInstance } from 'fastify';
import {
  createEstabelecimento,
  getEstabelecimento,
  getTiposEstabelecimentos,
} from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/estabelecimentos/:categoria', getEstabelecimento);
  fastify.get('/tipos/estabelecimentos', getTiposEstabelecimentos);
  fastify.post('/insert/estabelecimento', createEstabelecimento);
}
