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

        if (access_level === undefined || access_level === null){
            throw new Error("O nivel de acesso é obrigatório.")
        }

        if (access_level < 1 || access_level > 4){
            throw new Error("O nivel de acesso deve estar entre 1 e 4.")
        }

        const jobRoleAlreadyExists = await prismaClient.jobRole.findFirst({
            where: {
                role_name: role_name
            }
        });

        if (jobRoleAlreadyExists) {
            throw new Error("Este cargo já está cadastrado no sistema.");
        }

        const jobRole = await prismaClient.jobRole.create({
            data:{
                role_name:role_name,
                access_level: access_level,
            }
        })

        return jobRole

    }
}

export {CreateJobRoleServices}