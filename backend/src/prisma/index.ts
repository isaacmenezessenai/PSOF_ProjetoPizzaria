import { PrismaClient } from "../generated/prisma";

const prismaClient = new PrismaClient();

console.log('DATABASE_URL que a aplicação está usando: ', process.env.DATABASE_URL);

export default prismaClient;