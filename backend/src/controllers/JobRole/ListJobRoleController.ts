import { Request, Response } from "express";
import { ListJobRoleServices } from "../../services/JobRole/ListJobRoleServices"; 

class ListJobRoleController{
    async handle(req: Request, res: Response){
        
        const listJobRoleService = new ListJobRoleServices();

        const jobRole = await listJobRoleService.execute();

        return res.json(jobRole);
    }
}

export { ListJobRoleController }