/*
  Warnings:

  - You are about to drop the `Estabelecimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promocoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoEstabelecimento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Estabelecimento` DROP FOREIGN KEY `Estabelecimento_fk_tipo_estabelecimento_fkey`;

-- DropForeignKey
ALTER TABLE `Promocoes` DROP FOREIGN KEY `Promocoes_fk_estabelecimento_fkey`;

-- DropTable
DROP TABLE `Estabelecimento`;

-- DropTable
DROP TABLE `Promocoes`;

-- DropTable
DROP TABLE `TipoEstabelecimento`;

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
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modificado_em` DATETIME(3) NOT NULL,
    `promocao_rolando` BOOLEAN NOT NULL,
    `fk_tipo_estabelecimento` INTEGER NOT NULL,

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
