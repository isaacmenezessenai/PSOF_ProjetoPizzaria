/*
  Warnings:

  - Added the required column `banner` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ingredients" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
