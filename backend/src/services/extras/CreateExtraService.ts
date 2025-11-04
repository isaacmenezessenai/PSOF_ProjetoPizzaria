import prismaClient from "../../prisma";

interface ExtraRequest{
    name: string
    price: string
    category_id: string
}

class CreateExtraService {
    async execute({name, price}: ExtraRequest){
        const extra = await prismaClient.extras.create({
            data:{
                name : name,
                price: price
            }
        })

        return extra
        
    }
}

export {CreateExtraService}