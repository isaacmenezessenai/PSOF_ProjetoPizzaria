import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserEmployeeService{
    async execute({email, password} : AuthRequest){
        
        // 1. Busca o usuário no modelo correto (UsersEmployee) e inclui o JobRole (para pegar o nível de acesso)
        const user = await prismaClient.usersEmployee.findFirst({
            where:{
                email:email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                jobRole: { // ✅ Inclui o JobRole para acessar o access_level
                    select: {
                        access_level: true 
                    }
                }
            }
        })

        if(!user){
            throw new Error("E-mail ou senha incorretos")
        }
        
        // Garante que o usuário tem um JobRole
        if(!user.jobRole) {
             throw new Error("Usuário sem cargo definido.");
        }

        // 2. Compara a senha
        const passswordMatch = await compare(password, user.password)

        if(!passswordMatch){
            throw new Error("E-mail ou senha incorretos")
        }

        // 3. Gera o Token JWT, adicionando o access_level no payload
        const token = sign(
            {
                name: user.name,
                email: user.email,
                type: 'employee', 
                access_level: user.jobRole.access_level 
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        // 4. Retorna os dados + token
        return{
            id: user.id,
            name: user.name,
            email: user.email,
            access_level: user.jobRole.access_level,
            token: token
        }
    }
}

export {AuthUserEmployeeService};