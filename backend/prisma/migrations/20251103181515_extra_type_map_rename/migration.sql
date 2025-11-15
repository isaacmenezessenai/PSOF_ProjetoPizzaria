/*
  Warnings:

  - You are about to drop the `ingredientsType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."extras" DROP CONSTRAINT "extras_type_id_fkey";

-- DropTable
DROP TABLE "public"."ingredientsType";

-- CreateTable
CREATE TABLE "public"."ExtraType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extra_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExtraType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."extras" ADD CONSTRAINT "extras_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."ExtraType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
