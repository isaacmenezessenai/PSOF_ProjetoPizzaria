import { Request, Response } from "express";
import { AddFavoriteService } from "../../services/favorites/AddFavoriteService";

class AddFavoriteController {
    async handle(req: Request, res: Response) {
        
        const { product_id } = req.body;
        const user_id = req.user_id; 

        if (!product_id) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        if (!user_id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const addFavoriteService = new AddFavoriteService();

        try {
            const favorite = await addFavoriteService.execute({
                product_id: product_id as string,
                user_id: user_id as string
            });

            return res.json(favorite);

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { AddFavoriteController }