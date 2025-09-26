import prismaClient from "../../prisma";

class ListExtraIngredientService {
    async execute() {
        const ingredients = await prismaClient.ingredients.findMany({
            where: {
                extra: true
            },
            select: {
                id: true,
                name: true,
                price:true,
                extra: true,
                banner:true,
            }
        });
        return ingredients;
    }
}

export { ListExtraIngredientService };