import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface Payload {
    sub: string;
    type: 'client' | 'employee'; 
}

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string; 
                type: 'client' | 'employee';
            };
        }
    }
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token de autenticação não fornecido." }); 
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub, type } = verify(
            token,
            process.env.JWT_SECRET as string 
        ) as Payload;

        req.user = {
            id: sub,
            type: type
        };

        next();

    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    };
}