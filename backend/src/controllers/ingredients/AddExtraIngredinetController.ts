import { Request, Response } from "express";
import { AddExtraIngredientService } from "../../services/ingredients/AddExtraIngredientService";

class AddExtraIngredientController {
    async handle(req:Request, res:Response){
        const {item_id, ingredient_id, amount} = req.body

        const addExtraIngredientService = new AddExtraIngredientService()

        const extraIngredient = await addExtraIngredientService.execute({
            item_id, 
            ingredient_id, 
            amount
        })

        res.json(extraIngredient)

    }
}

export {AddExtraIngredientController}