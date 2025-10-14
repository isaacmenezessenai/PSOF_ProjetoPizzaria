-- CreateTable
CREATE TABLE "public"."ingredientsType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredientsType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ingredientsType" ADD CONSTRAINT "ingredientsType_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
