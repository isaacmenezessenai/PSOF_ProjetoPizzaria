import { Request, Response } from "express";
import { DetailsProductService } from "../../services/product/DetailsProductService";

class DetailsProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const detailsProduct = new DetailsProductService();

        const details = await detailsProduct.execute({
            product_id
        });

        return res.json(details);
    }
}

export { DetailsProductController };