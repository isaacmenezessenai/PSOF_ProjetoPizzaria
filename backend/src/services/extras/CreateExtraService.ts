import prismaClient from "../../prisma";

interface ExtraRequest{
    name: string
    price: string
    type_id: string
}

class CreateExtraService {
    async execute({name, price, type_id}: ExtraRequest){
        const extra = await prismaClient.extras.create({
            data:{
                name : name,
                price: price,
                type_id: type_id
            }
        })

        return extra
        
    }
}

export {CreateExtraService}