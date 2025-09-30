import prismaClient from "../../prisma";

interface ListTableActiveOrdersRequest{
    table_id: string;
}

class ListTableActiveOrdersService{
    async execute({table_id} : ListTableActiveOrdersRequest){
        const listByTable = await prismaClient.order.findMany({
            where:{
                table_id : table_id
            },
            include:{
                items:{
                    select:{
                        product_id:true
                    }
                }
            }
        })

        return listByTable

    }
}

export {ListTableActiveOrdersService}