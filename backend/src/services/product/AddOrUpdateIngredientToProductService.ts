
import prismaClient from "../../prisma";

interface AddOrUpdateIngredientRequest {
    ingredientId: string;
    productId: string;
    amount: number;
}

class AddOrUpdateIngredientToProductService {
    async execute({ ingredientId, productId, amount }: AddOrUpdateIngredientRequest) {
        if (!ingredientId || !productId || amount === null) {
            throw new Error('All fields are required.');
        }

        const existingRelation = await prismaClient.productIngredient.findUnique({
            where: {
                productId_ingredientId: {
                    productId: productId,
                    ingredientId: ingredientId,
                }
            }
        });

        if (existingRelation) {
            if (amount <= 0) {
                // Remove a relação se a quantidade for 0
                return await prismaClient.productIngredient.delete({
                    where: {
                        productId_ingredientId: {
                            productId: productId,
                            ingredientId: ingredientId,
                        }
                    }
                });
            } else {
                // Atualiza a quantidade se a relação já existe
                return await prismaClient.productIngredient.update({
                    where: {
                        productId_ingredientId: {
                            productId: productId,
                            ingredientId: ingredientId,
                        }
                    },
                    data: {
                        amount: amount
                    }
                });
            }
        } else {
            // Cria uma nova relação se ela não existir
            return await prismaClient.productIngredient.create({
                data: {
                    productId: productId,
                    ingredientId: ingredientId,
                    amount: amount
                }
            });
        }
    }
}

export { AddOrUpdateIngredientToProductService };