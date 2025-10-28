import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma"; 

/**
 * Função que retorna um middleware de autorização baseado no access_level do empregado.
 * * @param requiredLevel O nível mínimo de acesso necessário para esta rota (1, 2, ou 4).
 * @param allowClient Se true, usuários do tipo 'client' são permitidos a prosseguir.
 * @returns Um middleware do Express.
 */
export function isAuthorized(requiredLevel: number, allowClient: boolean = false) {
    
    // Retorna a função middleware real para ser usada na rota
    return async (req: Request, res: Response, next: NextFunction) => {
        
        // 1. Garante que o isAuthenticated já rodou e anexou req.user
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Erro de autenticação. Token não processado ou ausente." });
        }

        const { id: user_id, type: user_type } = req.user;

        // 2. Lógica para CLIENTE
        if (user_type === 'client') {
            if (allowClient) {
                return next(); 
            }

            return res.status(403).json({ error: "Acesso negado. Rota restrita a empregados." });
        }

        // 3. Lógica para EMPREGADO (Verificação de Nível de Acesso)
        if (user_type === 'employee') {
            
            const employee = await prismaClient.usersEmployee.findUnique({
                where: { 
                    id: user_id 
                },
                select: { 
                    jobRole: { 
                        select: { 
                            access_level: true 
                        } 
                    } 
                }
            });

            if (!employee || !employee.jobRole) {
                return res.status(403).json({ error: "Empregado sem cargo definido ou não encontrado. Acesso negado." });
            }

            const employeeAccessLevel = employee.jobRole.access_level;

            if (employeeAccessLevel >= requiredLevel) {
                return next(); 
                
            } else {
                const roleRequired = requiredLevel === 4 ? 'Gerente' : requiredLevel === 2 ? 'Cozinheiro' : 'Garçom';
                return res.status(403).json({ 
                    error: `Acesso negado. Nível mínimo necessário: ${roleRequired} (${requiredLevel}). Seu nível não é suficiente.`
                });
            }
        }
        
        return res.status(403).json({ error: "Tipo de usuário não reconhecido ou não autorizado." });
    };
}