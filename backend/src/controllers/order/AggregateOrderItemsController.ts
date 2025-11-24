import { Request, Response } from "express";
import { AggregateOrderItemsService } from "../../services/order/AggregateOrderItemsService";

class AggregateOrderItemsController {
    handle = async (req: Request, res: Response) => {
        
        const order_id = req.query.order_id as string;
        
        if (!order_id) {
            return res.status(400).json({ error: "Order ID is required." });
        }

        const aggregateItemsService = new AggregateOrderItemsService();

        try {
            const items = await aggregateItemsService.execute({
                order_id
            });
            
            return res.json(items);

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export { AggregateOrderItemsController };