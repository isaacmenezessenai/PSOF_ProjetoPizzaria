import { Request, Response } from "express";
import { ListExtrasByCategoryService } from "../../services/extras/ListExtrasByCategoryService";

class ListExtrasByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const service = new ListExtrasByCategoryService();

    const extras = await service.execute({ category_id });

    res.json(extras);
  }
}

export { ListExtrasByCategoryController };
