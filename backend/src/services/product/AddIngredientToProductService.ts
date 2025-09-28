import prismaClient from "../../prisma";

interface AddIngredientRequest {
    ingredient_id: string;
    product_id: string;
    amount: number;
}

class AddIngredientToProductService {
    async execute({ ingredient_id, product_id, amount }: AddIngredientRequest) {
        
       const productIngredient = await prismaClient.productIngredient.create({
            data: {
                ingredient_id : ingredient_id,
                product_id : product_id,
                amount
            }
        });

        return productIngredient;
    }
}

export { AddIngredientToProductService };