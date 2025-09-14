import prismaClient from "../../prisma";

interface ListIngredientsByProductRequest {
    productId: string;
}

class ListIngredientsByProductService {
    async execute({ productId }: ListIngredientsByProductRequest) {
        if (!productId) {
            throw new Error('Product ID is required.');
        }

        const productIngredients = await prismaClient.productIngredient.findMany({
            where: {
                productId: productId,
            },
            select: {
                amount: true,
                ingredient: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return productIngredients;
    }
}

export { ListIngredientsByProductService };