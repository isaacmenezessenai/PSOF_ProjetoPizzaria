import { Request, Response } from "express";
import { AuthUserEmployeeService } from "../../services/UsersEmployee/AuthUserEmployeeService";

class AuthUserEmployeeController {
    async handle(req: Request, res: Response) {
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
        }

        const authService = new AuthUserEmployeeService();

        try {
            const auth = await authService.execute({ email, password });
            
            return res.json(auth);
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido durante o login.";
            return res.status(401).json({ error: errorMessage }); 
        }
    }
}

export { AuthUserEmployeeController };