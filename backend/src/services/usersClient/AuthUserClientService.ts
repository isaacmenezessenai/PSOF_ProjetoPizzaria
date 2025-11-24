import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

// 1. Interface de Requisição atualizada para aceitar email OU cpf
interface AuthRequest{
    email?: string; 
    cpf?: string;   
    password: string;
}

class AuthUserService {
    async execute({ email, cpf, password }: AuthRequest) {
        
        // 2. Criar a condição de busca
        const searchCondition = email ? { email: email } : { cpf: cpf };

        // 3. Buscar o usuário no modelo 'usersClient' usando a condição
        const user = await prismaClient.usersClient.findFirst({
            where: searchCondition,
            select: {
                id: true,
                name: true,
                email: true,
                password: true, 
                cpf: true,
                dataNascimento: true, 
                favorites: {
                    select: {
                        id: true, 
                        product_id: true 
                    }
                }
            }
        })

        if (!user) {
            throw new Error("E-mail/CPF ou senha incorretos.");
        }
        
        // 🛑 DEBUG 1: O ID ESTÁ CHEGANDO DO BANCO?
        console.log("-----------------------------------------");
        console.log("DEBUG 1/3 - AUTH SERVICE: ID LIDO DO BANCO (user.id):");
        console.log("ID LIDO:", user.id);
        console.log("-----------------------------------------");


        // 4. Comparar a senha
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("E-mail/CPF ou senha incorretos.");
        }

        // 5. Gerar o Token JWT
        const token = sign(
            {
                sub: user.id, 
                name: user.name,
                email: user.email,
                type: 'client' 
            },
            process.env.JWT_SECRET as string, 
            {
                expiresIn: '30d'
            }
        )
        // 6. Retorno dos dados do usuário e do token
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf, 
            dataNascimento: user.dataNascimento,
            favorites: user.favorites,
            token: token
        }
    }
}

export { AuthUserService };