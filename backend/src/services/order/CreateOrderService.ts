import prismaClient from "../../prisma";

interface OrderRequest {
    table_id: string;
    name: string;
    observation: string;
}

class CreateOrderService{
    async execute({table_id, name, observation}: OrderRequest ){
        const order = await prismaClient.order.create({
            data:{
                table_id: table_id,
                name: name,
                observation: observation
            }
        })

        return order;

    }
}

export {CreateOrderService}