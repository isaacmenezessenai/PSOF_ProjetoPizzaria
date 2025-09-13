import { Request, Response } from "express";
import { CreateIngredientService } from "../../services/ingredients/CreateIngredientService";

class CreateIngredientController{
    async handle(req: Request, res: Response){
        
        const { name, amount, product_id} = req.body;
        
        const createIngredientService = new CreateIngredientService();

        const ingredient = await createIngredientService.execute({
            name,
            amount: Number(amount),
            product_id
        });

        return res.json(ingredient);
    }
}

export { CreateIngredientController }