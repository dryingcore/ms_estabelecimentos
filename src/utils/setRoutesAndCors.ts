import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import estabelecimentoRoute from '../routes/estabelecimentosRoutes';
import microsserviceStatusRoute from '../routes/microsserviceStatusRoute';

export const setRoutesAndCors = (fastify: FastifyInstance) => {
  fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'OPTIONS', 'POST'],
  });

  fastify.register(estabelecimentoRoute);
  fastify.register(microsserviceStatusRoute);
};
