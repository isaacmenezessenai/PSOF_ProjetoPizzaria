import prismaClient from "../../prisma";

interface IRequest {
  items_id: string;
  productIngredient_id: string; 
}

class AddRemovedIngredientService {
  async execute({ items_id, productIngredient_id }: IRequest) {
    
    const item = await prismaClient.item.findUnique({
      where: { id: items_id },
      select: { product_id: true }
    });

    if (!item) {
      throw new Error("Item não encontrado.");
    }

    const removedIngredient = await prismaClient.productIngredientRemoved.create({
      data: {
        items_id: items_id,
        productIngredient_id: productIngredient_id,
        product_id: item.product_id 
      }
    });

    return removedIngredient;
  }
}

export { AddRemovedIngredientService };