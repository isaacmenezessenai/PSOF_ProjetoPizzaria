import { Request, Response } from "express";
import { CreateIngredientService } from "../../services/ingredients/CreateIngredientService";

class CreateIngredientController {
    // Adicionando a tipagem de retorno e o bloco try...catch
    async handle(req: Request, res: Response): Promise<Response | void> {
        try {
            const { name } = req.body;
            
            const createIngredientService = new CreateIngredientService();

            const ingredient = await createIngredientService.execute({
                name
            });

            return res.json(ingredient);

        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { CreateIngredientController };