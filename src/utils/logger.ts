import { FastifyRequest, FastifyReply } from 'fastify';

export const logMainRoute = (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({
    message: 'Well, hello there!',
    version: '1.0.0',
    author: 'decodesoftware',
    origin: 'https://github.com/decodesoftware/tonajagua',
    repository: 'https://github.com/decodesoftware/tonajagua',
    documentation: 'https://github.com/decodesoftware/tonajagua',
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
      query: request.query,
      params: request.params,
      body: request.body,
    },
  });
};
