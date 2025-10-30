import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserClientRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    dataNascimento: Date; 
}

class CreateUsersClientService {
    async execute({ name, email, password, cpf, dataNascimento }: UserClientRequest) {
        
        if (!email) {
            throw new Error("O e-mail é obrigatório.");
        }
        if (!cpf) {
            throw new Error("O CPF é obrigatório.");
        }

        const userAlreadyExists = await prismaClient.usersClient.findFirst({
            where: {
                OR: [
                    { email: email },
                    { cpf: cpf }
                ]
            }
        });

        if (userAlreadyExists) {
            throw new Error("Usuário (e-mail ou CPF) já cadastrado.");
        }

        // --- 3. Criptografar Senha ---
        // O valor '8' é o 'salt rounds' (custo computacional)
        const passwordHash = await hash(password, 8);

        // --- 4. Criar o Usuário Cliente no Banco de Dados ---
        const userClient = await prismaClient.usersClient.create({
            data: {
                name: name,
                email: email,
                cpf: cpf,
                dataNascimento: dataNascimento,
                password: passwordHash,
            },
            // Seleciona quais campos retornar para a aplicação (nunca retorne a senha)
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                dataNascimento: true,
                created_at: true,
            }
        });

        return userClient;
    }
}

export { CreateUsersClientService };