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

        // 4. Comparar a senha
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("E-mail/CPF ou senha incorretos.");
        }

        // 5. Gerar o Token JWT
        const token = sign(
            {
                name: user.name,
                email: user.email,
                type: 'client' 
            },
            process.env.JWT_SECRET as string, 
            {
                subject: user.id,
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