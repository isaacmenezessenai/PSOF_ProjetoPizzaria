/*
  Warnings:

  - You are about to drop the column `ingredient_id` on the `ingredientsType` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ingredientsType` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `extras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_id` to the `ingredientsType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ingredientsType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ingredientsType" DROP CONSTRAINT "ingredientsType_ingredient_id_fkey";

-- AlterTable
ALTER TABLE "public"."extras" ADD COLUMN     "type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ingredientsType" DROP COLUMN "ingredient_id",
DROP COLUMN "type",
ADD COLUMN     "extra_id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."extras" ADD CONSTRAINT "extras_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."ingredientsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
