import prismaClient from "../../prisma";

class ListExtraService {
    async execute(){
        const extra = await prismaClient.extras.findMany({
            select:{
                id: true,
                name: true,
                price: true
            }
        })

        return extra
        
    }
}

export {ListExtraService}