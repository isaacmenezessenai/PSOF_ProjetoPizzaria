import { Request, Response } from "express";
import { CreateTypeExtraService} from "../../services/extras/CreateTypeExtraService";

class CreateTypeExtraController{
    async handle(req:Request, res:Response){
        const {name} = req.body
        
        const createTypeExtraService = new CreateTypeExtraService()

        const type = await createTypeExtraService.execute({
            name
        })

        res.json(type)

    }
}

export { CreateTypeExtraController }