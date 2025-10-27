import { Request, Response } from "express";
import { DetailUsersClientService } from "../../services/usersClient/DetailUserClientService"; 

class DetailUserClientController {
    async handle(req: Request, res: Response) { 

        const user_id = req.user_id;

        if (!user_id) {
            return res.status(401).json({ error: "Token de autenticação ausente ou inválido." });
        }

        const detailUserService = new DetailUsersClientService();

        try {
            const user = await detailUserService.execute(user_id);

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            return res.json(user);

        } catch (err) {

            const errorMessage = err instanceof Error ? err.message : "Erro ao buscar detalhes do usuário.";
            return res.status(400).json({ error: errorMessage });
        }
    }
}

export { DetailUserClientController };