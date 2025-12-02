import { Request, Response } from "express";
import { ListRemovedIngredientsService } from "../../services/order/ListRemovedIngredientsService";

class ListRemovedIngredientsController {
  async handle(req: Request, res: Response) {
    try {
      const { item_id } = req.query;

      if (!item_id || typeof item_id !== "string") {
        return res.status(400).json({ error: "item_id é obrigatório" });
      }

      const listRemovedIngredientsService = new ListRemovedIngredientsService();

      const removedIngredients = await listRemovedIngredientsService.execute({
        item_id,
      });

      return res.json(removedIngredients);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export { ListRemovedIngredientsController };
