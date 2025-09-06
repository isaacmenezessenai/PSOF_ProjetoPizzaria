import prismaClient from "../../prisma";

interface ProductRequest{
    product_id: string;
}

class DetailsProductService{
    async execute({product_id}: ProductRequest){

        const detailsProduct = await prismaClient.product.findUnique({
            where:{
                id: product_id
            },
            select:{
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
            }
        })

        return detailsProduct;
    }
}

export {DetailsProductService}