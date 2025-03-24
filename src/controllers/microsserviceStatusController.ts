import { FastifyReply, FastifyRequest } from 'fastify';

export async function microsserviceStatusController(req: FastifyRequest, reply: FastifyReply) {
  return reply
    .status(200)
    .send({ status: 'The microservice is running', version: '1.0.0', service_name: 'ms_estabelecimentos' });
}
