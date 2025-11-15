import prismaClient from "../../prisma";

interface ListByTypeRequest {
    ingredientType : string
}

class ListIngredientByTypeService {
    async execute({ingredientType} : ListByTypeRequest){
        const typeIngredient = await prismaClient.ingredientsType.findMany({
            where:{
                type : ingredientType
            },
            include:{
                ingredient:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return typeIngredient

    }
}

export {ListIngredientByTypeService}