import { Request, Response } from "express";
import { ListFavoritesService } from "../../services/favorites/ListFavoriteService";

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id; 

    const listFavoritesService = new ListFavoritesService();

    const favorites = await listFavoritesService.execute(user_id);

    return res.json(favorites);
  }
}

export { ListFavoritesController };