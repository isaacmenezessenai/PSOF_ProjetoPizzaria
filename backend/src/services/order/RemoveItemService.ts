// Conteúdo de RemoveItemService.ts

import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string; 
    product_id: string;
}

class RemoveItemService{
    async execute({order_id, product_id}: ItemRequest){ 
        
        const deletedItems = await prismaClient.item.deleteMany({
            where:{
                order_id: order_id,
                product_id: product_id,
            }
        })

        return deletedItems; 

    }
}

export {RemoveItemService}