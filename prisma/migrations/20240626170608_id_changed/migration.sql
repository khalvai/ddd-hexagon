/*
  Warnings:

  - The primary key for the `Outbox` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Outbox` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Outbox" DROP CONSTRAINT "Outbox_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Outbox_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Outbox_id_key" ON "Outbox"("id");
