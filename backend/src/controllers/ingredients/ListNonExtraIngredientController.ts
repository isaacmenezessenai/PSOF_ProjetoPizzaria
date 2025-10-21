import { Request, Response } from "express";
import { ListNonExtraIngredientService } from "../../services/ingredients/ListNonExtraIngredientService";

class ListNonExtraIngredientController {
    async handle(req: Request, res: Response) {
        try {
            const listNonExtraIngredientService = new ListNonExtraIngredientService();
            const ingredients = await listNonExtraIngredientService.execute();
            res.json(ingredients);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar ingredientes não extras" });
        }
    }
}

export { ListNonExtraIngredientController };
