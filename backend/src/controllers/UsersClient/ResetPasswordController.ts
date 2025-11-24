import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/usersClient/ResetPasswordService";

class ResetPasswordController {
    async handle(req: Request, res: Response) {
        
        const { email, newPassword } = req.body;

        const resetPasswordService = new ResetPasswordService();

        const result = await resetPasswordService.execute({ 
            email, 
            newPassword 
        });

        return res.json(result);
    }
}

export { ResetPasswordController };