import { Request, Response } from "express";
import { SumOrderService } from "../../services/order/SumOrderService";

class SumOrderController {
    async handle(req: Request, res: Response){
        const order_id = req.query.table_id as string;

        const sumOrderService = new SumOrderService();
        
        const order = await sumOrderService.execute({
            order_id
        })

       res.json(order);

    }
}

export {SumOrderController}