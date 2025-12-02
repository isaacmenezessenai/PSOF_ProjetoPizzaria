import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
}

class DetailsProductService {
    async execute({ product_id }: ProductRequest) {
        const product = await prismaClient.product.findUnique({
            where: {
                id: product_id
            },
            include: {
                category: true,
                ingredients: {
                    select: {
                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                banner: true
                            }
                        }
                    }
                }
            }
        });

        return product;
        
    }
}

export { DetailsProductService };