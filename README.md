[![.github/workflows/secure_deploy_with_docker_compose.yml](https://github.com/dryingcore/backend_tonajagua/actions/workflows/secure_deploy_with_docker_compose.yml/badge.svg?event=push)](https://github.com/dryingcore/backend_tonajagua/actions/workflows/secure_deploy_with_docker_compose.yml)

npm run prisma:migrate -> Criar as migrations
npm run prisma:generate -> Gerar o Prisma Client
npm run prisma:seed -> Rodar os seeds
npm run prisma:reset -> Resetar o banco
npm run setup:db -> Configurar o banco (migrate + generate + seed)
npm run start:production -> Subir a aplicação em produção
