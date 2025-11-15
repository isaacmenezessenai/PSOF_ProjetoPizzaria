import { Request, Response } from "express";
import { CreateJobRoleServices } from "../../services/JobRole/CreateJobRoleServices";

class CreateJobRoleController {
    async handle(req: Request, res: Response) {
        const { role_name, access_level } = req.body;

        const createJobRoleServices = new CreateJobRoleServices();

        try {
            
            const jobRole = await createJobRoleServices.execute({
                role_name,
                access_level: access_level 
            });

            
            return res.status(201).json(jobRole);

        } catch (err) {
            
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao criar o cargo.";
            
            return res.status(400).json({ error: errorMessage });
        }
    }
}

export { CreateJobRoleController };