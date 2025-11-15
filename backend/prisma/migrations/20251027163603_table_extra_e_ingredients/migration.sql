/*
  Warnings:

  - You are about to drop the column `extra` on the `ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ingredients" DROP COLUMN "extra";

-- CreateTable
CREATE TABLE "public"."productIngredientLiable" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "productIngredient_id" TEXT NOT NULL,
    "items_id" TEXT NOT NULL,
    "tem" BOOLEAN NOT NULL,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productIngredientLiable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itemExtra" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "extra_id" TEXT NOT NULL,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itemExtra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."extras" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."productIngredientLiable" ADD CONSTRAINT "productIngredientLiable_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productIngredientLiable" ADD CONSTRAINT "productIngredientLiable_productIngredient_id_fkey" FOREIGN KEY ("productIngredient_id") REFERENCES "public"."ProductIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productIngredientLiable" ADD CONSTRAINT "productIngredientLiable_items_id_fkey" FOREIGN KEY ("items_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itemExtra" ADD CONSTRAINT "itemExtra_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itemExtra" ADD CONSTRAINT "itemExtra_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "public"."extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
