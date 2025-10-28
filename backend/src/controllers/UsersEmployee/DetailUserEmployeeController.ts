import { Request, Response } from "express";
import { DetailUserEmployeeService } from "../../services/UsersEmployee/DetailUserEmployeeService";

class DetailUserEmployeeController {
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const detailUserEmployeeService = new DetailUserEmployeeService()

        const user = await detailUserEmployeeService.execute(user_id)

        res.json(user);

    }
}

export {DetailUserEmployeeController}