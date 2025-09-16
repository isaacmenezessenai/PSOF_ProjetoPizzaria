import prismaClient from "../../prisma";

interface DetailRequest{
    table_id: string;
}

class DetailTableService{
    async execute({table_id}: DetailRequest){
        const table = await prismaClient.table.findUnique({
            where:{
                id: table_id
            },
            include:{
                order: true
            }
        }) 
        return table;
    }
}

export {DetailTableService}