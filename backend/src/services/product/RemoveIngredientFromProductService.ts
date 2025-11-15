import prismaClient from "../../prisma";

interface RemoveIngredientFromProductRequest{
    product_id: string;
    ingredient_id: string;
}

class RemoveIngredientFromProductService{
    async execute({product_id, ingredient_id}: RemoveIngredientFromProductRequest){
        const findId = await prismaClient.productIngredient.findFirst({
            where:{
                product_id: product_id,
                ingredient_id: ingredient_id
            }
        })

        const removeIngredient = await prismaClient.productIngredient.delete({
            where:{
                id : findId.id
            }
        })

        removeIngredient

    }

}

export {RemoveIngredientFromProductService}