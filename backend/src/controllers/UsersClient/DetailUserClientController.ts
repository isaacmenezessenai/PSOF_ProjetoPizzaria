import { Request, Response } from "express";
import { DetailUsersClientService } from "../../services/usersClient/DetailUserClientService";

class DetailUserClientController {
    async handle(req: Request, res: Response): Promise<void> {

        // 1. Extração Defensiva do ID
        // Tenta 'id' e 'sub' (padrão JWT) para máxima compatibilidade.
        let user_id = (req.user as any)?.id || (req.user as any)?.sub;

        // 2. Limpeza do ID (Onde o erro sutil pode estar)
        if (user_id && typeof user_id === 'string') {
            user_id = user_id.trim();
        }

        // 🚨 LOG DE DEBUG CRÍTICO
        console.log("----------------------------------------");
        console.log("DEBUG CONTROLLER: ID FINAL ENVIADO AO SERVICE:", user_id);
        console.log("----------------------------------------");

        if (!user_id) {
            res.status(401).json({ error: "Token de autenticação ausente ou inválido." });
            return;
        }

        const detailUserService = new DetailUsersClientService();

        try {
            const user = await detailUserService.execute(user_id);

            res.json(user);
            return;

        } catch (err) {

            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao buscar detalhes do usuário.";

            // 4. Retorna status 404 se o Service lançar a exceção "Usuário não encontrado."
            if (errorMessage.includes("Usuário não encontrado")) {
                res.status(404).json({ error: errorMessage });
            } else {
                // Retorna 400 para outros erros que não são de autenticação ou not found
                res.status(400).json({ error: errorMessage });
            }

            return;
        }
    }
}

export { DetailUserClientController };