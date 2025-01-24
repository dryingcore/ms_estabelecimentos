import { buildDevelopmentServer, buildProductionServer } from './app';

if (process.env.NODE_ENV === 'production') {
  const fastify = buildProductionServer();

  // Start the server
  fastify.listen({ port: 9234, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      console.log('🚀 Server started on port 9234');
      fastify.log.info(`server listening on ${address}`);
    }
  });
} else {
  const fastify = buildDevelopmentServer();

  // Start the server
  fastify.listen({ port: 9878, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      fastify.log.info(`server listening on ${address}`);
    }
  });
}
