import prismaClient from "../../prisma";

interface TableRequest {
    number: number
}

class CreateTableService{
    async execute({number}: TableRequest) {
        const table = await prismaClient.table.create({
          data:{
            number: number
          }  
        })

        return table

    }
}

export {CreateTableService}