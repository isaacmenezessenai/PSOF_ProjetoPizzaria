// controllers/favorites/RemoveFavoriteController.ts

import { Request, Response } from "express";
import { RemoveFavoriteService } from "../../services/favorites/RemoveFavoriteService";

class RemoveFavoriteController{
    async handle(req:Request, res: Response){
        // Usar req.params é mais comum para IDs na rota (ex: /favorites/:favorites_id), 
        // mas mantendo req.body conforme o seu código original.
        const {favorites_id} = req.body

        const removeFavoriteService = new RemoveFavoriteService()

        try {
            const removeFavorite = await removeFavoriteService.execute({
                favorites_id: favorites_id
            });

            // Remoção concluída com sucesso (HTTP 200 OK)
            return res.json(removeFavorite); 

        } catch (err) {
            // Aqui capturamos o erro lançado pelo Service
            const errorMessage = err.message;

            if (errorMessage.includes("Favorite not found")) {
                // Retorna 404 Not Found se o registro não existir
                return res.status(404).json({ error: errorMessage });
            } 
            
            if (errorMessage.includes("Favorite ID is required")) {
                // Retorna 400 Bad Request se o ID estiver faltando
                return res.status(400).json({ error: errorMessage });
            }

            // Retorna 500 Internal Server Error para outros erros
            return res.status(500).json({ error: "An unexpected error occurred during removal." });
        }
    }
} 

export { RemoveFavoriteController };