import { FastifyInstance } from 'fastify';
import {
  getAllEstabelecimentos,
  getAllEstabelecimentosWithHorarios,
  getAllEstabelecimentosWithPromocoes,
} from '../controllers/estabelecimentoController';

export default async function estabelecimentoRoute(fastify: FastifyInstance) {
  fastify.get('/getAllEstabelecimentos', getAllEstabelecimentos);
  fastify.get('/getAllEstabelecimentosWithHorarios', getAllEstabelecimentosWithHorarios);
  fastify.get('/getAllEstabelecimentosWithPromocoes', getAllEstabelecimentosWithPromocoes);
}
