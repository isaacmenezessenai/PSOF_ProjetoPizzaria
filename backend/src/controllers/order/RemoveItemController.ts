import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req: Request, res: Response) {
        const { order_id, product_id } = req.body; 
        
        const orderIdString = order_id as string;
        const productIdString = product_id as string;


        // 1. Verifica se os parâmetros existem (usando as variáveis extraídas do body)
        if (!orderIdString || !productIdString) {
            return res.status(400).json({ error: "order_id and product_id are required." });
        }

        const removeItemService = new RemoveItemService();

        // 2. Executa o service
        const deletedItems = await removeItemService.execute({
            order_id: orderIdString,
            product_id: productIdString
        });

        res.json(deletedItems);
    }
}

export {RemoveItemController}