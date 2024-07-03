/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Outbox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "createdAt",
ADD COLUMN     "occurredOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "payload" SET DATA TYPE TEXT;
