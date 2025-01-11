import Fastify from 'fastify';

// add option to fastify
const fastify = Fastify({
  logger: true,
});

// set a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// start server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    fastify.log.info(`server listening on ${address}`);
  }
});
