// Apenas cria o ingrediente no banco de dados.
// A quantidade e o produto serão definidos em outro serviço, na tabela ProductIngredient.

import prismaClient from "../../prisma";

interface IngredientRequest {
    name: string;
}

class CreateIngredientService {
    async execute({ name }: IngredientRequest) {
        if (!name) {
            throw new Error('Name is required.');
        }

        
        const ingredient = await prismaClient.ingredients.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        });

        return ingredient;
    }
}

export { CreateIngredientService };