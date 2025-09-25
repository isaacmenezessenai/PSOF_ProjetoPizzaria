import prismaClient from "../../prisma";

interface SetExtraIngredientRequest {
    ingredient_id: string;
}

class SetExtraIngredientService {
    async execute({ ingredient_id }: SetExtraIngredientRequest) {
        const ingredient = await prismaClient.ingredients.findUnique({
            where: {
                id: ingredient_id
            }
        });

        if (ingredient.extra === false) {
            const setExtraTrue = await prismaClient.ingredients.update({
                where: {
                    id: ingredient_id
                },
                data: {
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

            return setExtraTrue;     

        } else {
            const setExtraFalse = await prismaClient.ingredients.update({
                where: {
                    id: ingredient_id
                },
                data: {
                    extra: false
                },
                select: {
                    id: true,
                    name: true,
                    price:true,
                    extra: true,
                    banner:true,
                }
            });

            return setExtraFalse;
            
        }

    }
}

export { SetExtraIngredientService}