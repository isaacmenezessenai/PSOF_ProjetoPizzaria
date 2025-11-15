import prismaClient from "../../prisma";

class DetailUserEmployeeService{
    async execute(user_id: string){

        const user = await prismaClient.usersEmployee.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
                cpf:true,
                dataNascimento:true,
                jobRole:{
                    select:{
                        role_name:true,
                        access_level:true,
                    }
                }
            }
        })

        return user;
    }
}

export { DetailUserEmployeeService}