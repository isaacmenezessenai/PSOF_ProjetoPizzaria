import { Response, Request } from "express";
import { RemoveTypeExtraService } from "../../services/extras/RemoveTypeExtraService";

class RemoveTypeExtraController{
    async handle(req: Request, res: Response){
        const type_id = req.query.type_id as string

        const removeTypeExtraService = new RemoveTypeExtraService()

        const type = await removeTypeExtraService.execute({
            type_id
        })

        res.json (type)

    }
}

export { RemoveTypeExtraController }