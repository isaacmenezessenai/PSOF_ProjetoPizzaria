import { Request, Response } from "express";

class LogoutUserClientController {
    async handle(req: Request, res: Response) {
        
        
        return res.status(200).json({ message: "Sessão encerrada com sucesso." });
    }
}

export { LogoutUserClientController };