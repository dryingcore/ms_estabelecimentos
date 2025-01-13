/*
  Warnings:

  - You are about to drop the column `horario_de_funcionamento` on the `estabelecimento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `estabelecimento` DROP COLUMN `horario_de_funcionamento`;

-- CreateTable
CREATE TABLE `horario_funcionamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,
    `abre` VARCHAR(191) NOT NULL,
    `fecha` VARCHAR(191) NOT NULL,
    `estabelecimento_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `horario_funcionamento` ADD CONSTRAINT `horario_funcionamento_estabelecimento_id_fkey` FOREIGN KEY (`estabelecimento_id`) REFERENCES `estabelecimento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
