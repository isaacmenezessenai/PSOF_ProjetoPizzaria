import { Request, Response } from "express";
import { RemoveFavoriteService } from "../../services/favorites/RemoveFavoriteService";

class RemoveFavoriteController{
    async handle(req:Request, res: Response){
        const {favorites_id} = req.body

        const removeFavoriteService = new RemoveFavoriteService()

        const removeFavorite = await removeFavoriteService.execute({

           favorites_id:favorites_id

        });

        res.json(removeFavorite)

    }
} 

export {RemoveFavoriteController}