import { Request, Response } from "express";
import { UpdateItemStatusService } from "../../services/order/UpdateItemStatusService";

class UpdateItemStatusController {
    handle = async (req: Request, res: Response) => {
        const { item_id } = req.body;
        
        if (!item_id) {
            return res.status(400).json({ error: "Item ID is required." });
        }

        const updateItemService = new UpdateItemStatusService();

        try {
            const updatedItem = await updateItemService.execute({ item_id });
            return res.json(updatedItem);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export { UpdateItemStatusController };