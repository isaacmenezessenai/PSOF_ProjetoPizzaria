import { Request, Response } from "express";
import { CreateTableService } from "../../services/table/CreateTableService";

class CreateTableController{
    async handle(req:Request, res: Response){
        const {number, users_id} = req.body;

        const createTableService = new CreateTableService()

        const table = await createTableService.execute({
            number,
            users_id,
        })

        res.json(table)

    }
}

export {CreateTableController}