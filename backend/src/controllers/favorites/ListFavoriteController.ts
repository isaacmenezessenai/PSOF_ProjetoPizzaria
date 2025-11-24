import { Request, Response } from "express";
import { ListFavoritesService } from "../../services/favorites/ListFavoriteService";

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const user_id = (req as any).user?.id || req.user_id; 

    if (!user_id) {
      return res.status(401).json({ error: "User not authenticated or ID missing" });
    }

    const listFavoritesService = new ListFavoritesService();

    const favorites = await listFavoritesService.execute(user_id as string);

    return res.json(favorites);
  }
}

export { ListFavoritesController };