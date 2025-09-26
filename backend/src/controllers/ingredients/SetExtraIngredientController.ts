import {Request, Response} from "express";
import { SetExtraIngredientService } from "../../services/ingredients/SetExtraIngredientService";

class SetExtraIngredientController{
    async handle(req:Request, res: Response){
        const {ingredient_id} = req.body

        const setExtra = new SetExtraIngredientService();

        const ingredient = await setExtra.execute({
            ingredient_id
        });

        res.json(ingredient)

    }
}

export {SetExtraIngredientController}