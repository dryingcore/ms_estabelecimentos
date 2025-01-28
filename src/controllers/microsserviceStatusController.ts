import { FastifyReply, FastifyRequest } from 'fastify';

export async function microsserviceStatusController(req: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ status: 'All good' });
}
