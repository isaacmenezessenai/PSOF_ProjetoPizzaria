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
): void { 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Token de autenticação não fornecido." }); 
        return; 
    }

    const [, token] = authHeader.split(" ");
    
    const secret = process.env.JWT_SECRET || '98388750f63fac47136942aaf8ac79ce'; 

    try {
        const decoded = verify(
            token,
            secret as string
        ) as { sub?: string, type: 'client' | 'employee' };
        
        const sub = decoded.sub || ''; 
        const type = decoded.type;

        // 🛑 DEBUG 2/3: O ID ESTÁ VINDO DO TOKEN DECODIFICADO?
        console.log("-----------------------------------------");
        console.log("DEBUG 2/3 - MIDDLEWARE: PAYLOAD DECODIFICADO");
        console.log("SUB (ID):", sub); // DEVE SER O ID edde1224-4add-457f-8c97-78785b6db06a
        console.log("SECRET USADO:", secret);
        console.log("-----------------------------------------");

        req.user = {
            id: sub,
            type: type
        };
        
        next();

    } catch (err) {
        
        console.error("JWT VERIFY ERROR:", err);
        res.status(401).json({ error: "Token inválido ou expirado." });
        return; 
    };
}