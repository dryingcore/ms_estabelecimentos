import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tipoEstabelecimentos = await prisma.tipo_estabelecimento.createMany({
    data: [{ nome: 'Restaurante' }, { nome: 'Supermercado' }, { nome: 'Loja de Roupas' }],
  });
  console.log('Tipos de estabelecimento criados:', tipoEstabelecimentos);

  const estabelecimentos = await prisma.estabelecimento.createMany({
    data: [
      {
        cnpj: '12345678000100',
        endereco: 'Rua Principal, 123',
        nome: 'Restaurante Bom Sabor',
        aberto: true,
        website: 'https://bomsabor.com',
        foto_local:
          'https://www.creativefabrica.com/wp-content/uploads/2019/08/Restaurant-Logo-by-Koko-Store-580x386.jpg',
        promocao_rolando: true,
        fk_tipo_estabelecimento: 1,
      },
      {
        cnpj: '98765432000100',
        endereco: 'Av. Central, 456',
        nome: 'Supermercado Central',
        aberto: true,
        website: 'https://supercentral.com',
        foto_local:
          'https://marketplace.canva.com/EAGPvH7XcNA/1/0/1600w/canva-logo-restaurante-delivery-rustico-Rvgeb9_mfLk.jpg',
        promocao_rolando: false,
        fk_tipo_estabelecimento: 2,
      },
      {
        cnpj: '98765432000100',
        endereco: 'Av. Horizontal, 789',
        nome: 'Loja de Roupas Central',
        aberto: true,
        website: 'https://supercentral.com',
        foto_local:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCGZYpOBHyS6gQ5vuAu21l5nhk6kyjBsS7cIJcicU9_-Qv6W_kU7Voio1rQa3XFmNwsc&usqp=CAU',
        promocao_rolando: false,
        fk_tipo_estabelecimento: 2,
      },
      {
        cnpj: '98765432000100',
        endereco: 'Av. Horizontal, 789',
        nome: 'Loja de Roupas Central',
        aberto: true,
        website: 'https://supercentral.com',
        foto_local:
          'https://img.freepik.com/vector-premium/logotipo-restaurante-occidental-ilustracion-vector-personaje-dibujos-animados-chef_100311-7.jpg',
        promocao_rolando: false,
        fk_tipo_estabelecimento: 2,
      },
    ],
  });
  console.log('Estabelecimentos criados:', estabelecimentos);

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
