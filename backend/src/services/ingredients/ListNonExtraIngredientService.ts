import prismaClient from "../../prisma";

class ListNonExtraIngredientService {
    async execute() {
        const ingredients = await prismaClient.ingredients.findMany({
            where: {
                extra: false
            },
            select: {
                id: true,
                name: true,
                price: true,
                banner: true,
                extra: true
            }
        });
        return ingredients;
    }
}

export { ListNonExtraIngredientService };
