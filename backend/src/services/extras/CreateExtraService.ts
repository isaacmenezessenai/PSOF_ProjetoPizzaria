import prismaClient from "../../prisma";

interface ExtraRequest{
    name: string
    price: string
    category_id: string
}

class CreateExtraService {
    async execute({name, price, category_id}: ExtraRequest){
        const extra = await prismaClient.extras.create({
            data:{
                name : name,
                price: price,
                category_id: category_id
            }
        })

        return extra
        
    }
}

export {CreateExtraService}