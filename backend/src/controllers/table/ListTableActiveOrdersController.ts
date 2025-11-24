import { Request, Response } from "express";
import { ListTableActiveOrdersService } from "../../services/table/ListTableActiveOrdersService";

class ListTableActiveOrdersController {
    async handle(req: Request, res: Response) {
        const { table_id } = req.body

        const ListTableActiveOrders = new ListTableActiveOrdersService();

        const table = await ListTableActiveOrders.execute({
            table_id
        })

        res.json(table)

    }
}

export { ListTableActiveOrdersController }