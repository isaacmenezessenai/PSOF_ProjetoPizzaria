import prismaClient from "../../prisma";

interface JobRoleRequest{
    role_name: string,
    access_level: number
}

class CreateJobRoleServices{
    async execute({role_name, access_level}: JobRoleRequest){

        // verificações básicas
        if (!role_name){
            throw new Error("O nome do cargo é obrigatório.")
        }


    }
}