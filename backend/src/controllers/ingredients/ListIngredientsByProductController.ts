import { Request, Response } from "express";
import { ListIngredientsByProductService } from "../../services/ingredients/ListIngredientsByProductService";

class ListIngredientsByProductController{
    async handle(req: Request, res: Response): Promise<Response | void> {
        try {
            const { product_id } = req.params;
            
            const listIngredientsByProductService = new ListIngredientsByProductService();

            const ingredients = await listIngredientsByProductService.execute({
                productId: product_id,
            });

            return res.json(ingredients);

        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { ListIngredientsByProductController };