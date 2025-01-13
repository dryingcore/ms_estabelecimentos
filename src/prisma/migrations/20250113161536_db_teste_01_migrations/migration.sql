-- AlterTable
ALTER TABLE `estabelecimento` ADD COLUMN `horario_de_funcionamento` JSON NOT NULL;

-- CreateIndex
CREATE INDEX `promocoes_ativo_idx` ON `promocoes`(`ativo`);
