import { FastifyReply, FastifyRequest } from 'fastify';
import { EstabelecimentoService } from '../services/estabelecimentoService';
import { estabelecimentoDTO } from '../dto/estabelecimentoDTO';

interface GetEstabelecimentoParams {
  categoria: string;
}

export async function getEstabelecimento(
  request: FastifyRequest<{ Params: GetEstabelecimentoParams }>,
  reply: FastifyReply,
) {
  try {
    const { categoria } = request.params;

    const estabelecimentos = await EstabelecimentoService.getEstabelecimento(categoria);

    return reply.status(200).send({
      message: 'Estabelecimentos listados com sucesso!',
      data: estabelecimentos,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function createEstabelecimento(
  request: FastifyRequest<{ Body: estabelecimentoDTO }>,
  reply: FastifyReply,
) {
  try {
    const estabelecimento = await EstabelecimentoService.insertEstabelecimento(request.body);

    return reply.status(201).send({
      message: 'Estabelecimento adicionado com sucesso!',
      data: estabelecimento,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao criar o estabelecimento' });
  }
}

export async function getTiposEstabelecimentos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tiposEstabelecimentos = await EstabelecimentoService.getTiposEstabelecimentos();

    return reply.status(200).send({
      message: 'Tipos de estabelecimentos listados com sucesso!',
      data: tiposEstabelecimentos,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
}
