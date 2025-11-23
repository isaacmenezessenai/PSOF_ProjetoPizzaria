import prismaClient from "../../prisma";

interface TypeExtraRequest{
    name: string
}

class CreateTypeExtraService {
    async execute({ name }: TypeExtraRequest){
        const type = await prismaClient.extraType.create({
            data:{
                name : name
            }
        })

        return type
        
    }
}

export {CreateTypeExtraService}