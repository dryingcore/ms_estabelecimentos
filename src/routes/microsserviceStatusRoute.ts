import { FastifyInstance } from 'fastify';
import { microsserviceStatusController } from '../controllers/microsserviceStatusController';

export default async function microsserviceStatusRoute(fastify: FastifyInstance) {
  fastify.get('/status', microsserviceStatusController);
}
