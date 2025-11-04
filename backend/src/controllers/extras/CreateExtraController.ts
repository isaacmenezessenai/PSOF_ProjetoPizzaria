import { Request, Response } from "express";
import { CreateExtraService } from "../../services/extras/CreateExtraService";

class CreateExtraController{
    async handle(req: Request, res:Response){
        const {name, price, category_id} = req.body;

        const createExtraService = new CreateExtraService()

        const extra = await createExtraService.execute({
            name, 
            price,
            category_id
        })

        res.json(extra)

    }
}

export {CreateExtraController}