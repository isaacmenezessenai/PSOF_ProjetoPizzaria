import { Request, Response } from "express";
import { GetOrderByTableServices } from "../../services/order/GetOrderByTableServices";

class GetOrderByTableController {
    async handle(req: Request, res: Response) {
        const { table_id } = req.params;

        const getOrderByTableServices = new GetOrderByTableServices();

        const orders = await getOrderByTableServices.execute({ table_id });

        return res.json(orders);
    }
}

export { GetOrderByTableController };
