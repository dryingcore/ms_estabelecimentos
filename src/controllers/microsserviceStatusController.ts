import { FastifyReply, FastifyRequest } from 'fastify';

export async function microsserviceStatusController(req: FastifyRequest, reply: FastifyReply) {
  return { status: 'All good' };
}
