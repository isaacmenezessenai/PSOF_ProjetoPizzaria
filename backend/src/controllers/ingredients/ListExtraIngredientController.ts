import { Request, Response } from "express";
import { ListExtraIngredientService } from "../../services/ingredients/ListExtraIngredientService";

class ListExtraIngredientController {
    async handle(req: Request, res: Response) {
            const listExtraIngredientService = new ListExtraIngredientService();

            const ingredients = await listExtraIngredientService.execute();

            res.json(ingredients);
    }
}

export { ListExtraIngredientController }