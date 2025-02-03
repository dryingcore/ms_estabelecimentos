import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tipoEstabelecimentos = await prisma.tipo_estabelecimento.createMany({
    data: [
      { nome: 'Restaurante' },
      { nome: 'Supermercado' },
      { nome: 'Padaria' },
      { nome: 'Hotel' },
      { nome: 'Sorveteria' },
      { nome: 'Serviços' },
      { nome: 'Oficina' },
    ],
  });
  console.log('Tipos de estabelecimento criados:', tipoEstabelecimentos);

  const estabelecimentos = await prisma.estabelecimento.createMany({
    data: [
      {
        cnpj: '12345678000100',
        endereco: 'Rua Principal, 123',
        nome: 'Restaurante Bom Sabor',
        aberto: true,
        senha_acesso: '123456',
        website: 'https://bomsabor.com',
        promocao_rolando: true,
        fk_tipo_estabelecimento: 1,
      },
    ],
  });
  console.log('Estabelecimentos criados:', estabelecimentos);

  // Agora, inserimos os horários de funcionamento na tabela `horario_funcionamento`
  const horarios = await prisma.horario_funcionamento.createMany({
    data: [
      // Horários para o "Restaurante Bom Sabor" (ID 1)
      { dia: 'segunda', abre: '08:00', fecha: '20:00', estabelecimento_id: 1 },
      { dia: 'terca', abre: '08:00', fecha: '20:00', estabelecimento_id: 1 },
      { dia: 'quarta', abre: '08:00', fecha: '20:00', estabelecimento_id: 1 },
      { dia: 'quinta', abre: '08:00', fecha: '20:00', estabelecimento_id: 1 },
      { dia: 'sexta', abre: '08:00', fecha: '22:00', estabelecimento_id: 1 },
      { dia: 'sabado', abre: '10:00', fecha: '22:00', estabelecimento_id: 1 },
      { dia: 'domingo', abre: '10:00', fecha: '18:00', estabelecimento_id: 1 },

      // Horários para o "Supermercado Central" (ID 2)
      { dia: 'segunda', abre: '07:00', fecha: '22:00', estabelecimento_id: 2 },
      { dia: 'terca', abre: '07:00', fecha: '22:00', estabelecimento_id: 2 },
      { dia: 'quarta', abre: '07:00', fecha: '22:00', estabelecimento_id: 2 },
      { dia: 'quinta', abre: '07:00', fecha: '22:00', estabelecimento_id: 2 },
      { dia: 'sexta', abre: '07:00', fecha: '23:00', estabelecimento_id: 2 },
      { dia: 'sabado', abre: '07:00', fecha: '23:00', estabelecimento_id: 2 },
      { dia: 'domingo', abre: '08:00', fecha: '20:00', estabelecimento_id: 2 },

      // Horários para a "Loja de Roupas Central" (ID 3)
      { dia: 'segunda', abre: '10:00', fecha: '19:00', estabelecimento_id: 3 },
      { dia: 'terca', abre: '10:00', fecha: '19:00', estabelecimento_id: 3 },
      { dia: 'quarta', abre: '10:00', fecha: '19:00', estabelecimento_id: 3 },
      { dia: 'quinta', abre: '10:00', fecha: '19:00', estabelecimento_id: 3 },
      { dia: 'sexta', abre: '10:00', fecha: '20:00', estabelecimento_id: 3 },
      { dia: 'sabado', abre: '10:00', fecha: '20:00', estabelecimento_id: 3 },
      { dia: 'domingo', abre: null, fecha: null, estabelecimento_id: 3 }, // Fechado no domingo
    ],
  });

  console.log('Horários de funcionamento criados:', horarios);

  const promocoes = await prisma.promocoes.createMany({
    data: [
      {
        descricao: 'Desconto de 20% em pratos selecionados',
        data_inicio: new Date(),
        data_fim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de hoje
        fk_estabelecimento: 1,
        valor_desconto: 20.0,
        tipo_desconto: 'PORCENTAGEM',
        ativo: true,
      },
      {
        descricao: 'Compre 2 e pague 1',
        data_inicio: new Date(),
        data_fim: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias a partir de hoje
        fk_estabelecimento: 2,
        valor_desconto: 50.0,
        tipo_desconto: 'PORCENTAGEM',
        ativo: true,
      },
    ],
  });
  console.log('Promoções criadas:', promocoes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
