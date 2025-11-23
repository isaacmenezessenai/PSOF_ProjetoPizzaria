import { Request, Response } from "express";
import { ListExtraService } from "../../services/extras/ListExtraService";

class ListExtraController{
    async handle(req: Request, res:Response){
        const listExtraService = new ListExtraService()

        const extra = await listExtraService.execute()

        res.json(extra)

    }
}

export {ListExtraController}