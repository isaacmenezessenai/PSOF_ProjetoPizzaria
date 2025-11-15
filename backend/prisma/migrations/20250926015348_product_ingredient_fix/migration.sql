/*
  Warnings:

  - The primary key for the `ProductIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredientId` on the `ProductIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductIngredient` table. All the data in the column will be lost.
  - The required column `id` was added to the `ProductIngredient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ingredient_id` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductIngredient" DROP CONSTRAINT "ProductIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductIngredient" DROP CONSTRAINT "ProductIngredient_productId_fkey";

-- AlterTable
ALTER TABLE "public"."ProductIngredient" DROP CONSTRAINT "ProductIngredient_pkey",
DROP COLUMN "ingredientId",
DROP COLUMN "productId",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "ingredient_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."ProductIngredient" ADD CONSTRAINT "ProductIngredient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
