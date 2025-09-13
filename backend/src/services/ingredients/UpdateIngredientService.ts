import prismaClient from "../../prisma";

interface UpdateIngredientRequest {
    ingredient_id: string;
    product_id: string;
    amount: number;
}

class UpdateIngredientService {
    async execute({ ingredient_id, product_id, amount }: UpdateIngredientRequest) {
        if (!ingredient_id || !product_id) {
            throw new Error("Ingredient ID e Product ID é requirido.");
        }

        if (amount <= 0) {
            const ingredient = await prismaClient.ingredients.update({
                where: { id: ingredient_id },
                data: {
                    product_id: null,
                },
            });
            return ingredient;

        } else {
            const ingredient = await prismaClient.ingredients.update({
                where: { id: ingredient_id },
                data: {
                    product_id: product_id,
                    amount: amount,
                },
            });
            return ingredient;
        }
    }
}

export { UpdateIngredientService };