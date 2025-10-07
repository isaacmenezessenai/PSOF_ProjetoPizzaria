import { Request, Response } from "express";
import { RemoveExtraIngredientService } from "../../services/ingredients/RemoveExtraIngredientService";

class RemoveExtraIngredientController{
    async handle(req:Request, res: Response){
        const {IngredientExtra_id} = req.body

        const removeExtraIngredientService = new RemoveExtraIngredientService()

        const removeExtraIngredient = await removeExtraIngredientService.execute({

            IngredientExtra_id

        });

        res.json(removeExtraIngredient)

    }
} 

export {RemoveExtraIngredientController}