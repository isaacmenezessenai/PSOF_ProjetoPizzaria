import prismaClient from "../../prisma";

interface TableRequest {
    number: number
    users_id: string
}

class CreateTableService{
    async execute({number, users_id}: TableRequest) {
        const table = await prismaClient.table.create({
          data:{
            number: number,
            users_id: users_id,
          }  
        })

        return table

    }
}

export {CreateTableService}