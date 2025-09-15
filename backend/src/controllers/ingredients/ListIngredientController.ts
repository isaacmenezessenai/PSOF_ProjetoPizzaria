import { Request, Response } from "express";
import { ListIngredientService } from "../../services/ingredients/ListIngredientService";

class ListIngredientController {
    async handle(req: Request, res: Response): Promise<Response | void> {
        try {
            const listIngredientService = new ListIngredientService();

            const ingredients = await listIngredientService.execute();

            return res.json(ingredients);
        } catch (error) { 
            return res.status(500).json({ error: "Ocorreu um erro ao listar os ingredientes." });
        }
    }
}

export { ListIngredientController };