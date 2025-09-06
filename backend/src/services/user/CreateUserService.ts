import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        if(!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        try {
            const user = await prismaClient.user.create({
                data:{
                    name: name,
                    email: email,
                    password: passwordHash,
                    created_at: new Date(),
                    update_at: new Date(),
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                }
            })

            return user;
        } catch (error) {
            console.error('Erro ao inserir usuário no banco de dados:', error);
            throw new Error('Erro ao criar usuário.');
        }
    }
}

export { CreateUserService }