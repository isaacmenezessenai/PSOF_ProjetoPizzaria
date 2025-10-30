/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."favorites" DROP CONSTRAINT "favorites_users_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."table" DROP CONSTRAINT "table_users_id_fkey";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."usersClient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usersEmployee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "jobRoleId" TEXT NOT NULL,

    CONSTRAINT "usersEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobRole" (
    "id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "access_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usersClient_cpf_key" ON "public"."usersClient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usersEmployee_cpf_key" ON "public"."usersEmployee"("cpf");

-- AddForeignKey
ALTER TABLE "public"."usersEmployee" ADD CONSTRAINT "usersEmployee_jobRoleId_fkey" FOREIGN KEY ("jobRoleId") REFERENCES "public"."jobRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."usersClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table" ADD CONSTRAINT "table_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "public"."usersEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
