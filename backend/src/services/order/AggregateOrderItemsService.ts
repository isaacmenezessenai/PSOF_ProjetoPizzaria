import prismaClient from "../../prisma";

interface ListItemsRequest {
    order_id: string;
}

interface AggregatedItem {
    id: string; 
    name: string; 
    price: string; 
    total_amount: number; 
}

class AggregateOrderItemsService {
    async execute({ order_id }: ListItemsRequest): Promise<AggregatedItem[]> {
        
        // 1. Group and sum the quantity of items by product_id
        const groupedItems = await prismaClient.item.groupBy({
            by: ['product_id'],
            where: {
                order_id: order_id,
            },
            _sum: {
                amount: true,
            },
            orderBy: {
                product_id: 'asc',
            }
        });

        // 2. Extract the list of Product IDs to fetch product details
        const productIds = groupedItems.map(item => item.product_id);

        // 3. Fetch full details of all grouped products
        const products = await prismaClient.product.findMany({
            where: {
                id: {
                    in: productIds,
                }
            },
            select: {
                id: true,
                name: true,
                price: true,
            }
        });
        
        // 4. Map and format the final result
        const aggregatedItems: AggregatedItem[] = groupedItems.map(grouped => {
            
            
            const product = products.find(p => p.id === grouped.product_id);

            if (!product) {
                throw new Error(`Product with ID ${grouped.product_id} not found.`);
            }

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                total_amount: grouped._sum.amount || 0,
            };
        });

        return aggregatedItems;
    }
}

export { AggregateOrderItemsService };