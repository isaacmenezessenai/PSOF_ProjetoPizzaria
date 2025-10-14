import prismaClient from "../../prisma";

interface IngredientTypeRequest{
    ingredient_id: string;
    type: string;
}

class AddTypeIngredientService{
    async execute({ingredient_id, type}: IngredientTypeRequest){
        if (type != 'salgado' && type != 'doce' ){
            throw new Error('This type does not exist!');
        }

        const ingredientsType = await prismaClient.ingredientsType.create({
            data:{
                ingredient_id : ingredient_id,
                type : type,
            },
            select:{
                id: true,
                ingredient_id: true,
                type: true
            }
        });

        return ingredientsType

    }
}

export {AddTypeIngredientService}