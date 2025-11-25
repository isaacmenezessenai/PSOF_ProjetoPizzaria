import { Request, Response } from "express";
import { ListItemExtraService } from "../../services/order/ListItemExtraService";

class ListItemExtraController{
    async handle(req: Request, res: Response){

            const item_id = req.query.item_id as string;

            const listItemExtraService = new ListItemExtraService();

            const extras = await listItemExtraService.execute({
                item_id: item_id,
            });

            return res.json(extras);
    }
}

export { ListItemExtraController };