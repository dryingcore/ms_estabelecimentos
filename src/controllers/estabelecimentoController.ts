import { FastifyReply, FastifyRequest } from 'fastify';
import { EstabelecimentoService } from '../services/estabelecimentoService';
import { estabelecimentoDTO } from '../dto/estabelecimentoDTO';

interface QueryParams {
  categoria?: string;
}

export async function getEstabelecimentos(request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) {
  try {
    const { categoria } = request.query;

    const data = categoria
      ? await EstabelecimentoService.getEstabelecimentosByCategoria(categoria)
      : await EstabelecimentoService.getEstabelecimentos();

    return reply.status(200).send({ data });
  } catch (error) {
    console.error('Erro ao listar estabelecimentos:', error);
    return reply.status(500).send({ error: 'Erro ao buscar estabelecimentos. Tente novamente mais tarde.' });
  }
}

export async function createEstabelecimento(
  request: FastifyRequest<{ Body: estabelecimentoDTO }>,
  reply: FastifyReply,
) {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      return reply.status(400).send({ error: 'Dados inválidos para criação de estabelecimento.' });
    }

    const estabelecimento = await EstabelecimentoService.createEstabelecimentoService(request.body);

    return reply.status(201).send({
      message: 'Estabelecimento adicionado com sucesso!',
      data: estabelecimento,
    });
  } catch (error) {
    console.error('Erro ao criar o estabelecimento:', error);
    return reply.status(500).send({ error: 'Erro ao criar o estabelecimento. Tente novamente mais tarde.' });
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
    console.error('Erro ao listar tipos de estabelecimentos:', error);
    return reply.status(500).send({ error: 'Erro interno ao buscar tipos de estabelecimentos.' });
  }
}
