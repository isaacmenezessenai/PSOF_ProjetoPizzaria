/*
  Warnings:

  - Added the required column `users_id` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table" ADD COLUMN     "users_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
