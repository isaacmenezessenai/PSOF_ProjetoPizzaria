import { Request, Response } from "express";
import { RemoveExtraService } from "../../services/extras/RemoveExtraService";

class RemoveExtraController {
    async handle(req: Request, res: Response){

        const extra_id = req.query.extra_id as string

        const removeExtraRequest = new RemoveExtraService()

        const extra = await removeExtraRequest.execute({
            extra_id
        })

        res.json (extra)

    }
}

export {RemoveExtraController}