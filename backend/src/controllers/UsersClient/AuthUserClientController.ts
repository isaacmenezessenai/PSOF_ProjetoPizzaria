import { Request, Response } from "express";
// Mantenha o nome do serviço, mas ele precisará de ajustes internos!
import { AuthUserService } from "../../services/usersClient/AuthUserClientService";

class AuthUserClientController {
    async handle(req: Request, res: Response) {
        // 1. Recebe email, cpf e password do corpo.
        const { email, cpf, password } = req.body;

        // 2. Validação para garantir que PElO MENOS um dos campos
        if (!password) {
            return res.status(400).json({ error: "A senha é obrigatória." });
        }
        
        if (!email && !cpf) {
            return res.status(400).json({ error: "É necessário fornecer o email ou o CPF para fazer login." });
        }

        const authUserService = new AuthUserService();

        try {
            // 3. Chama o serviço passando os três campos. 
            const auth = await authUserService.execute({
                email: email,
                cpf: cpf,
                password: password
            });

            return res.json(auth);
            
        } catch (err) {
            
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido na autenticação.";
            return res.status(401).json({ error: errorMessage }); 
        }
    }
}

export { AuthUserClientController };