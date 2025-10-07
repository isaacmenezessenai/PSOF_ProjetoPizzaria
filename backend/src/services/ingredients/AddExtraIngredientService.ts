import prismaClient from "../../prisma";

interface ExtraIngredientRequest {
    item_id: string
    ingredient_id: string
    amount: number
}

class AddExtraIngredientService{
    async execute({item_id, ingredient_id, amount}: ExtraIngredientRequest){
        const ingredientExtra = await prismaClient.itemIngredient.create({
            data:{
                item_id : item_id,
                ingredient_id : ingredient_id, 
                amount : amount
            },
            select:{
                id: true
            }
        });

        return ingredientExtra

    }
}

export {AddExtraIngredientService};