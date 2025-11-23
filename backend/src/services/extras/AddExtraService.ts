import prismaClient from "../../prisma";

interface AddExtraRequest{
    item_id : string
    extra_id : string
}

class AddExtraService {
    async execute({item_id, extra_id} : AddExtraRequest){
        const extra = await prismaClient.itemExtra.create({
            data:{
                item_id: item_id,
                extra_id: extra_id
            }
        })

        return extra

    }

}

export { AddExtraService }