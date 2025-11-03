-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "usersClient_id" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_usersClient_id_fkey" FOREIGN KEY ("usersClient_id") REFERENCES "usersClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
