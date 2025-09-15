-- DropForeignKey
ALTER TABLE "public"."table" DROP CONSTRAINT "table_users_id_fkey";

-- AlterTable
ALTER TABLE "public"."ingredients" ALTER COLUMN "banner" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."table" ALTER COLUMN "users_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."table" ADD CONSTRAINT "table_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
