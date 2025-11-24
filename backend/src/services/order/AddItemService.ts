// Conteúdo de AddItemService.ts

import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService{
    async execute({order_id, product_id, amount}: ItemRequest){
        
        // Array para armazenar todas as promessas de criação
        const itemCreations = [];

        // Correção confirmada: Itera o número EXATO de vezes de 'amount'
        for (let i = 0; i < amount; i++) {
            
            // Cria uma promessa para criar um Item, mas com amount fixo em 1
            const creationPromise = prismaClient.item.create({
                data:{
                    order_id: order_id,
                    product_id: product_id,
                    amount: 1, 
                }
            });
            
            itemCreations.push(creationPromise);
        }

        // Executa todas as criações de uma vez de forma transacional e segura
        const createdItems = await prismaClient.$transaction(itemCreations);

        return createdItems;
    }
}

export {AddItemService}