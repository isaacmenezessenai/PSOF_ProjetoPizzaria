import { Request, Response } from "express";
import { AddOrUpdateIngredientToProductService } from "../../services/product/AddOrUpdateIngredientToProductService";

class AddOrUpdateIngredientToProductController {
    async handle(req: Request, res: Response) {
        try {
            const { ingredientId, productId, amount } = req.body;

            const service = new AddOrUpdateIngredientToProductService();

            const result = await service.execute({
                ingredientId,
                productId,
                amount: Number(amount)
            });

            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { AddOrUpdateIngredientToProductController };