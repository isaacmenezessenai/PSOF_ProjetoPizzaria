/*
  Warnings:

  - You are about to drop the `ingredientsType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productIngredientLiable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `extras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ingredientsType" DROP CONSTRAINT "ingredientsType_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productIngredientLiable" DROP CONSTRAINT "productIngredientLiable_items_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productIngredientLiable" DROP CONSTRAINT "productIngredientLiable_productIngredient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productIngredientLiable" DROP CONSTRAINT "productIngredientLiable_product_id_fkey";

-- AlterTable
ALTER TABLE "public"."extras" ADD COLUMN     "category_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."ingredientsType";

-- DropTable
DROP TABLE "public"."productIngredientLiable";

-- CreateTable
CREATE TABLE "public"."productIngredientRemoved" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "productIngredient_id" TEXT NOT NULL,
    "items_id" TEXT NOT NULL,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productIngredientRemoved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."productIngredientRemoved" ADD CONSTRAINT "productIngredientRemoved_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productIngredientRemoved" ADD CONSTRAINT "productIngredientRemoved_productIngredient_id_fkey" FOREIGN KEY ("productIngredient_id") REFERENCES "public"."ProductIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productIngredientRemoved" ADD CONSTRAINT "productIngredientRemoved_items_id_fkey" FOREIGN KEY ("items_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."extras" ADD CONSTRAINT "extras_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
