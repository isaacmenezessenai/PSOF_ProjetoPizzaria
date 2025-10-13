import prismaClient from "../../prisma";

interface OrderRequest {
    table_id: string;
}

class GetOrderByTableServices {
    async execute({ table_id }: OrderRequest) {
        const orders = await prismaClient.order.findMany({
            where: {
                table_id: table_id,
                draft: false
            },
            orderBy: {
                updated_at: "desc"
            },
            include: {
                items: { 
                    include: { 
                        product: true 
                    }
                }, 
                table: true
            }
        });

        return orders;
    }
}

export { GetOrderByTableServices };