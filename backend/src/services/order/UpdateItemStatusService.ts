import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
}

class UpdateItemStatusService {
    async execute({ item_id }: ItemRequest) {

        // 1. Atualiza o status do item específico para TRUE (Concluído)
        const updatedItem = await prismaClient.item.update({
            where: {
                id: item_id,
            },
            data: {
                status: true, 
            }
        });

        // 2. Retorna o item atualizado
        return updatedItem;
    }
}

export { UpdateItemStatusService };