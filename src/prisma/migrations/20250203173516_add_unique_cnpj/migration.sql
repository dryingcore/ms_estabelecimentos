-- CreateTable
CREATE TABLE `promocoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `fk_estabelecimento` INTEGER NOT NULL,
    `valor_desconto` DOUBLE NOT NULL,
    `tipo_desconto` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modificado_em` DATETIME(3) NOT NULL,

    INDEX `promocoes_ativo_idx`(`ativo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estabelecimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `aberto` BOOLEAN NOT NULL,
    `website` VARCHAR(191) NULL,
    `foto_local` VARCHAR(191) NULL,
    `senha_acesso` VARCHAR(191) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modificado_em` DATETIME(3) NOT NULL,
    `promocao_rolando` BOOLEAN NOT NULL,
    `fk_tipo_estabelecimento` INTEGER NOT NULL,

    UNIQUE INDEX `estabelecimento_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horario_funcionamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,
    `abre` VARCHAR(191) NULL,
    `fecha` VARCHAR(191) NULL,
    `estabelecimento_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_estabelecimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `promocoes` ADD CONSTRAINT `promocoes_fk_estabelecimento_fkey` FOREIGN KEY (`fk_estabelecimento`) REFERENCES `estabelecimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_fk_tipo_estabelecimento_fkey` FOREIGN KEY (`fk_tipo_estabelecimento`) REFERENCES `tipo_estabelecimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horario_funcionamento` ADD CONSTRAINT `horario_funcionamento_estabelecimento_id_fkey` FOREIGN KEY (`estabelecimento_id`) REFERENCES `estabelecimento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
