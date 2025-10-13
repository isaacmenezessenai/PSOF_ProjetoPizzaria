import prismaClient from "../../prisma";

interface TableRequest {
    number: number;
}

class GetTableByNumberService {
    async execute({ number }: TableRequest) {
        const table = await prismaClient.table.findFirst({
            where: {
                number: number
            }
        });

        return table;
    }
}

export { GetTableByNumberService };
