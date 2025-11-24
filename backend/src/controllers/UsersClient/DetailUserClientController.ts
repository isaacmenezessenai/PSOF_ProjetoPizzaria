import { Request, Response } from "express";
import { DetailUsersClientService } from "../../services/usersClient/DetailUserClientService"; 

class DetailUserClientController {
    // ✅ CORREÇÃO: Adiciona a tipagem 'Promise<void>' e torna a leitura do ID segura.
    async handle(req: Request, res: Response): Promise<void> { 

        const user_id = req.user?.id; // Usando optional chaining (?.)

        if (!user_id) {
            res.status(401).json({ error: "Token de autenticação ausente ou inválido." });
            return; // Garante que o método retorna Promise<void>
        }

        const detailUserService = new DetailUsersClientService();

        try {
            const user = await detailUserService.execute(user_id);

            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }

            res.json(user);
            return;

        } catch (err) {

            const errorMessage = err instanceof Error ? err.message : "Erro ao buscar detalhes do usuário.";
            res.status(400).json({ error: errorMessage });
            return;
        }
    }
}

export { DetailUserClientController };