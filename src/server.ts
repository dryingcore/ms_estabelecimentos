import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { logMainRoute } from './utils/logger';
import { estabelecimentoRoute } from './routes/estabelecimentosRoute';

// add option to fastify
const fastify = Fastify({
  logger: true,
});

// add cors
fastify.register(cors, {
  origin: '*', // Permitir todas as origens (substitua com o domínio permitido em produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
});

// set a route
fastify.get('/about', async (request: FastifyRequest, reply: FastifyReply) => {
  logMainRoute(request, reply);
  return;
});

fastify.register(estabelecimentoRoute);

// start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    fastify.log.info(`server listening on ${address}`);
  }
});
