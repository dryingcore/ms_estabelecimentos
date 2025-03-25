import { FastifyReply, FastifyRequest } from 'fastify';
import { readFileSync } from 'fs';
import { join } from 'path';

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

export async function microsserviceStatusController(req: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    status: 'The microservice is running',
    version: packageJson.version,
    service_name: 'ms_estabelecimentos',
    date: new Date(),
    endpoints: [
      { method: 'GET', path: '/estabelecimentos', description: 'Listar estabelecimentos' },
      { method: 'GET', path: '/estabelecimentos/tipos', description: 'Listar tipos de estabelecimentos' },
      { method: 'POST', path: '/estabelecimentos', description: 'Criar estabelecimento' },
    ],
  });
}
