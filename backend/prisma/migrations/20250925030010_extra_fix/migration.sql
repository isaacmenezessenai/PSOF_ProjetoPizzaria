/*
  Warnings:

  - You are about to drop the column `Extra` on the `ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "Extra",
ADD COLUMN     "extra" BOOLEAN NOT NULL DEFAULT false;
