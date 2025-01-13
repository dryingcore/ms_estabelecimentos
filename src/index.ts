import { buildDevelopmentServer, buildProductionServer } from './app';

if (process.env.NODE_ENV === 'production') {
  const fastify = buildProductionServer();

  // Start the server
  fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      fastify.log.info(`server listening on ${address}`);
    }
  });
} else {
  const fastify = buildDevelopmentServer();

  // Start the server
  fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      fastify.log.info(`server listening on ${address}`);
    }
  });
}
