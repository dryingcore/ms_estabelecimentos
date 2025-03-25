import { FastifyReply, FastifyRequest } from 'fastify';

export async function microsserviceStatusController(req: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    status: 'The microservice is running',
    service_name: 'ms_estabelecimentos',
    date: new Date().toLocaleString(),
    endpoints: [
      { method: 'GET', path: '/estabelecimentos', description: 'Listar estabelecimentos' },
      { method: 'GET', path: '/estabelecimentos/tipos', description: 'Listar tipos de estabelecimentos' },
      { method: 'POST', path: '/estabelecimentos', description: 'Criar estabelecimento' },
    ],
  });
}
