// Apenas cria o ingrediente no banco de dados.
// A quantidade e o produto serão definidos em outro serviço, na tabela ProductIngredient.

import prismaClient from "../../prisma";

interface IngredientRequest {
    name: string;
    banner: string;
}

class CreateIngredientService {
    async execute({ name, banner}: IngredientRequest) {
        if (!name || !banner) {
            throw new Error('Name and banner are required.');
        }

        const ingredient = await prismaClient.ingredients.create({
            data: {
                name: name,
                banner: banner,
            },
            select: {
                id: true,
                name: true,
                banner: true,
            }
        });

        return ingredient;
    }
}

export { CreateIngredientService };