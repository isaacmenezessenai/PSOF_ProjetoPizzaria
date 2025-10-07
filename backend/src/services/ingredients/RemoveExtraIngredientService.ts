import prismaClient from "../../prisma";

interface RemoveExtraIngredientRequest{
    IngredientExtra_id: string
}

class RemoveExtraIngredientService {
    async execute ({IngredientExtra_id} : RemoveExtraIngredientRequest){
        const ingredientExtra = await prismaClient.itemIngredient.delete({
            where:{
                id : IngredientExtra_id
            }
        })

        return ingredientExtra

    }

}

export {RemoveExtraIngredientService}