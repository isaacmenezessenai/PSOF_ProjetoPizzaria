import prismaClient from "../../prisma";

interface AddIngredientRequest {
    ingredient_id: string;
    product_id: string;

}

class AddIngredientToProductService {
    async execute({ ingredient_id, product_id}: AddIngredientRequest) {
        
        const productIngredient = await prismaClient.productIngredient.create({
            data: {
                ingredient_id : ingredient_id,
                product_id : product_id
            }
        });

        return productIngredient;
    }
}

export { AddIngredientToProductService };