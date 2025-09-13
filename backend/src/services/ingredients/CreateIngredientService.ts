// services/ingredients/CreateIngredientService.ts

import prismaClient from "../../prisma";

interface IngredientRequest {
    name: string;
    amount: number;
    product_id: string; // Adicione esta linha
}

class CreateIngredientService {
    async execute({ name, amount, product_id }: IngredientRequest) {
        if (name === '' || amount <= 0 || product_id === '') {
            throw new Error('Invalid name, amount or product ID.');
        }

        const ingredient = await prismaClient.ingredients.create({ // Verifique o nome da sua tabela
            data: {
                name: name,
                amount: amount,
                product_id: product_id, // Adicione esta linha
            },
            select: {
                id: true,
                name: true,
                amount: true,
            }
        });

        return ingredient;
    }
}

export { CreateIngredientService };