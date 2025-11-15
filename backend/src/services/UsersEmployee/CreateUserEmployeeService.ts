import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserEmployeeRequest {
    name: string;
    email: string;
    password: string;
    cpf: string; 
    dataNascimento: Date; 
    jobRoleId: string; 
}

class CreateUserEmployeeService {
    async execute({ name, email, password, cpf, dataNascimento, jobRoleId }: UserEmployeeRequest) {
        
        // 1. Validações básicas e obrigatórias
        if (!email) {
            throw new Error("O e-mail é obrigatório.");
        }
        if (!cpf) {
            throw new Error("O CPF é obrigatório.");
        }
        if (!jobRoleId) {
            throw new Error("O cargo (jobRoleId) é obrigatório.");
        }

        // 2. Verificação de usuário existente (e-mail ou CPF devem ser únicos)
        const userAlreadyExists = await prismaClient.usersEmployee.findFirst({
            where: {
                OR: [
                    { email: email },
                    { cpf: cpf }
                ]
            }
        })

        if (userAlreadyExists) {
            throw new Error("Empregado já cadastrado (e-mail ou CPF).")
        }
        
        // 3. Verifica se o Cargo (JobRole) existe
        const jobRoleExists = await prismaClient.jobRole.findUnique({
            where: { id: jobRoleId }
        });

        if (!jobRoleExists) {
            throw new Error("O JobRole com o ID fornecido não existe.");
        }

        // 4. Hash da senha
        const passwordHash = await hash(password, 8)

        // 5. Criação do Empregado
        const userEmployee = await prismaClient.usersEmployee.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                cpf: cpf,
                dataNascimento: dataNascimento,
                jobRoleId: jobRoleId, 
            },
            
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                dataNascimento: true,
                jobRole: { 
                    select: { id: true, access_level:true}
                }
            }
        })

        return userEmployee;
    }
}

export { CreateUserEmployeeService }
