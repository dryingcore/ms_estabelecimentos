import Fastify, { FastifyInstance } from 'fastify';
import { setRoutesAndCors } from './utils/setRoutesAndCors';

export const buildDevelopmentServer = (): FastifyInstance => {
  const fastify = Fastify({ logger: true });
  setRoutesAndCors(fastify);
  return fastify;
};

export const buildProductionServer = (): FastifyInstance => {
  const fastify = Fastify({
    logger: false,
    https: {
      key: process.env.KEY,
      cert: process.env.CERT,
    },
  });
  setRoutesAndCors(fastify);
  return fastify;
};
