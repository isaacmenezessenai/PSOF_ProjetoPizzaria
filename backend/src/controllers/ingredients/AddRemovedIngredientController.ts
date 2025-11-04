import { Response, Request } from "express";
import { AddRemovedIngredientService } from "../../services/ingredients/AddRemovedIngredientService";

class AddRemovedIngredientController {
  async handle(req: Request, res: Response) {
    
    const { items_id, productIngredient_id } = req.body;

    if (!items_id || !productIngredient_id) {
      throw new Error("campos obrigatórios ausentes: items_id ou productIngredient_id");
    }

    if (typeof productIngredient_id !== 'string' || productIngredient_id.trim() === '') {
        throw new Error("productIngredient_id não pode ser um string vazio");
    }
    
    if (typeof items_id !== 'string' || items_id.trim() === '') {
        throw new Error("items_id não pode ser um string vazio");
    }

    const addRemovedIngredientService = new AddRemovedIngredientService();

    const result = await addRemovedIngredientService.execute({
      items_id,
      productIngredient_id 
    });

    return res.json(result);
  }
}

export { AddRemovedIngredientController };