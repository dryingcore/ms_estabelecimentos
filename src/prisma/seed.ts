import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Populando o banco de dados...');

  // 🔹 1. Criar Tipos de Estabelecimentos
  const tipoEstabelecimentos = await prisma.tipo_estabelecimento.createMany({
    data: [
      { nome: 'Restaurante', foto_url: 'https://s01.decodesoftware.tech/uploads/icons/hamburger.png' },
      { nome: 'Supermercado', foto_url: 'https://s01.decodesoftware.tech/uploads/icons/mercado.png' },
      { nome: 'Padaria', foto_url: 'https://s01.decodesoftware.tech/uploads/icons/padaria.png' },
      { nome: 'Hotel', foto_url: '' },
      { nome: 'Sorveteria', foto_url: 'sorvete.png' },
      { nome: 'Serviços', foto_url: 'servicos-digitais.png' },
      { nome: 'Oficina', foto_url: 'oficina.png' },
    ],
    skipDuplicates: true, // Evita erro se já existirem
  });

  console.log('✅ Tipos de Estabelecimentos criados:', tipoEstabelecimentos);

  // 🔹 2. Buscar o ID do tipo "Restaurante"
  const restauranteTipo = await prisma.tipo_estabelecimento.findFirst({
    where: { nome: 'Restaurante' },
  });

  if (!restauranteTipo) {
    throw new Error('❌ Tipo de estabelecimento "Restaurante" não encontrado');
  }

  // 🔹 3. Criar um Estabelecimento
  const estabelecimento = await prisma.estabelecimento.create({
    data: {
      cnpj: '12345678000100',
      endereco: 'Rua Principal, 123',
      nome: 'Restaurante Bom Sabor',
      aberto: true,
      senha_acesso: '123456',
      website: 'https://bomsabor.com',
      promocao_rolando: true,
      fk_tipo_estabelecimento: restauranteTipo.id,
    },
  });

  console.log('✅ Estabelecimento criado:', estabelecimento);

  // 🔹 4. Criar Horários de Funcionamento
  const horarios = await prisma.horario_funcionamento.createMany({
    data: [
      { dia: 'segunda', abre: '08:00', fecha: '20:00', estabelecimento_id: estabelecimento.id },
      { dia: 'terca', abre: '08:00', fecha: '20:00', estabelecimento_id: estabelecimento.id },
      { dia: 'quarta', abre: '08:00', fecha: '20:00', estabelecimento_id: estabelecimento.id },
      { dia: 'quinta', abre: '08:00', fecha: '20:00', estabelecimento_id: estabelecimento.id },
      { dia: 'sexta', abre: '08:00', fecha: '22:00', estabelecimento_id: estabelecimento.id },
      { dia: 'sabado', abre: '10:00', fecha: '22:00', estabelecimento_id: estabelecimento.id },
      { dia: 'domingo', abre: '10:00', fecha: '18:00', estabelecimento_id: estabelecimento.id },
    ],
  });

  console.log('✅ Horários de funcionamento criados:', horarios);

  // 🔹 5. Criar Promoção
  const promocoes = await prisma.promocoes.createMany({
    data: [
      {
        descricao: 'Desconto de 20% em pratos selecionados',
        data_inicio: new Date(),
        data_fim: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expira em 7 dias
        fk_estabelecimento: estabelecimento.id,
        valor_desconto: 20.0,
        tipo_desconto: 'PORCENTAGEM',
        ativo: true,
      },
    ],
  });

  console.log('✅ Promoções criadas:', promocoes);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
