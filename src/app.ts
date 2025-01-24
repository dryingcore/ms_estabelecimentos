import Fastify, { FastifyInstance } from 'fastify';
import { setRoutesAndCors } from './utils/setRoutesAndCors';
import fs from 'fs';

export const buildDevelopmentServer = (): FastifyInstance => {
  const fastify = Fastify({ logger: true });
  setRoutesAndCors(fastify);
  return fastify;
};

export const buildProductionServer = (): FastifyInstance => {
  const keyPath = process.env.KEY;
  const certPath = process.env.CERT;

  if (!keyPath || !certPath) {
    throw new Error('SSL certificate paths are not defined in environment variables');
  }

  const key = fs.readFileSync(keyPath, 'utf8');
  const cert = fs.readFileSync(certPath, 'utf8');

  const fastify = Fastify({
    logger: true,
    https: {
      key,
      cert,
    },
  });

  setRoutesAndCors(fastify);
  return fastify;
};
