import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class SumOrderService{
    async execute({order_id}: DetailRequest){

        const items = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{
                product: true
            }
        })
    
        const sum = items.reduce((total, item) => {
            return total + Number(item.product.price) * item.amount;    
        }, 0)
    
        return {sum};
    }
}

export {SumOrderService}