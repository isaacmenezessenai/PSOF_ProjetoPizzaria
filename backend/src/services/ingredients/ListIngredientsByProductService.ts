import prismaClient from "../../prisma";

interface ListIngredientsByProductRequest {
    productId: string | null | undefined;
}

class ListIngredientsByProductService {
    async execute({ productId }: ListIngredientsByProductRequest) {
        
        // 1. VALIDAÇÃO: Se o ID não for uma string válida (não for null, undefined ou string vazia),
        if (!productId || typeof productId !== 'string' || productId.trim() === '') {
            console.log("AVISO: ID de produto inválido ou ausente. Retornando lista de ingredientes vazia.");
            return [];
        }
        
        // 2. BUSCA NO BANCO: Esta busca só será executada se o 'productId' for válido.
        const productIngredients = await prismaClient.productIngredient.findMany({
            where: {
                // Aqui o filtro é aplicado com o ID válido
                product_id: productId,
            },
            select: {
                id: true,
                ingredient: {
                    select: {
                        id: true,
                        name: true,
                        banner:true
                    }
                }
            }
        });

        return productIngredients;
    }
}

export { ListIngredientsByProductService };