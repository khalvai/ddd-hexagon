/*
  Warnings:

  - You are about to drop the column `eventType` on the `Outbox` table. All the data in the column will be lost.
  - Added the required column `name` to the `Outbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "eventType",
ADD COLUMN     "name" TEXT NOT NULL;
