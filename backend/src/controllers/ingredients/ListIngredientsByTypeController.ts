import { Response, Request } from "express";
import { ListIngredientByTypeService } from "../../services/ingredients/ListIngredientsbyTypeService";

class ListIngredientByTypeController{
    async handle(req:Request, res:Response){
        const ingredientType = req.query.ingredientType as string

        const listIngredientByTypeService = new ListIngredientByTypeService()

        const listIngredientByType = await listIngredientByTypeService.execute({
            ingredientType
        })

        res.json(listIngredientByType)

    }
}

export {ListIngredientByTypeController}