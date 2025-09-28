import { Request, Response } from "express";
import { AddIngredientToProductService } from "../../services/product/AddIngredientToProductService";

class AddIngredientToProductController {
    async handle(req: Request, res: Response) {
        try {
            const { ingredient_id, product_id, amount } = req.body;

            const service = new AddIngredientToProductService();

            const result = await service.execute({
                ingredient_id,
                product_id,
                amount: Number(amount)
            });

            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { AddIngredientToProductController };