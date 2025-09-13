import { Request, Response } from "express";
import { UpdateIngredientService } from "../../services/ingredients/UpdateIngredientService";

class UpdateIngredientController {
    async handle(req: Request, res: Response) {
        const { ingredient_id, product_id, amount } = req.body;

        const updateIngredientService = new UpdateIngredientService();
        const ingredient = await updateIngredientService.execute({
            ingredient_id,
            product_id,
            amount: Number(amount)
        });

        return res.json(ingredient);
    }
}

export { UpdateIngredientController };