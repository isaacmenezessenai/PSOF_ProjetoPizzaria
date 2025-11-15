import prismaClient from "../../prisma";

class ListJobRoleServices{
    async execute(){

        const jobRole = await prismaClient.jobRole.findMany({    

            select:{
                id:true,
                role_name:true,
                access_level:true,
            }
        })  
        return jobRole;
    }
}

export { ListJobRoleServices}