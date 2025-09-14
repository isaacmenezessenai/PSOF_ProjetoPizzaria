import prismaClient from "../../prisma";

class ListIngredientService {
    async execute() {
        const ingredients = await prismaClient.ingredients.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        return ingredients;
    }
}

export { ListIngredientService };