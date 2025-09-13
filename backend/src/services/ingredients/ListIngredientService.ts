import prismaClient from "../../prisma";

class ListIngredientService {
    async execute() {
        const ingredients = await prismaClient.ingredients.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
            }
        });

        return ingredients;
    }
}

export { ListIngredientService };