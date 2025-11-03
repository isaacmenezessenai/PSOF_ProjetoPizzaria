import { Response, Request } from "express";
import { AddExtraService } from "../../services/extras/AddExtraService";

class AddExtraController{
    async handle (req: Request, res: Response){
        const {item_id, extra_id} = req.body

        const addExtraService = new AddExtraService();

        const extra = await addExtraService.execute({
            item_id,
            extra_id
        })

        res.json(extra)

    }
}

export { AddExtraController }