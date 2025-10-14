import { Response, Request } from "express";
import { AddTypeIngredientService } from "../../services/ingredients/AddTypeIngredientService";

class AddTypeIngredientController {
    async handle(req: Request, res: Response) {
        const {ingredient_id, type} = req.body

        const addTypeIngredientService = new AddTypeIngredientService;

        const ingredientType = await addTypeIngredientService.execute({
            ingredient_id, 
            type
        });

        res.json(ingredientType)

    }
}

export  {AddTypeIngredientController }