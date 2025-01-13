import { FastifyInstance } from 'fastify';
import { getAllEstabelecimentos, getAllEstabelecimentosWithPromocoes } from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/getAllEstabelecimentos', getAllEstabelecimentos);
  fastify.get('/getAllEstabelecimentosWithPromocoes', getAllEstabelecimentosWithPromocoes);
}
