import prismaClient from "../../prisma";

interface RemoveTypeExtraRequest{
    type_id : string
}

class RemoveTypeExtraService{
    async execute({type_id}:RemoveTypeExtraRequest){
        const type = await prismaClient.extraType.delete({
            where:{
                id:type_id
            }
        })

        return type

    }
}

export { RemoveTypeExtraService }