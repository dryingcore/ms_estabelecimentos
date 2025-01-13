import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import { estabelecimentoRoute } from '../routes/estabelecimentosRoute';
import { logMainRoute } from './logger';

export const setRoutesAndCors = (fastify: FastifyInstance) => {
  fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'OPTIONS'],
  });

  fastify.register(estabelecimentoRoute);
  fastify.get('/about', logMainRoute);
};
