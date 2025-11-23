import prismaClient from "../../prisma";

interface RemoveExtraRequest{
    extra_id : string
}

class RemoveExtraService{
    async execute({extra_id} : RemoveExtraRequest){
        const extra = await prismaClient.extras.delete({
            where:{
                id:extra_id
            }
        })

        return extra

    }

}

export {RemoveExtraService}
