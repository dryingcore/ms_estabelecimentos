import { buildDevelopmentServer, buildProductionServer } from './app';

console.log('Starting server...');

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  const fastify = buildProductionServer();

  fastify.listen({ port: 4321, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    } else {
      console.log(`🚀 Server started on ${address}`);
    }
  });
} else {
  console.log('Running in development mode');
  const fastify = buildDevelopmentServer();

  fastify.listen({ port: 4321, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    } else {
      console.log(`🚀 Server started on ${address}`);
    }
  });
}
