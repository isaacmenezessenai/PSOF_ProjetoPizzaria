import prismaClient from "../../prisma";

interface Request {
  item_id: string;
}

class ListRemovedIngredientsService {
  async execute({ item_id }: Request) {
    const removedIngredients = await prismaClient.productIngredientRemoved.findMany({
      where: {
        items_id: item_id,
      },
      select: {
        id: true,
        productIngredient: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // Formata para retornar apenas o nome do ingrediente
    const formattedRemoved = removedIngredients.map((removed) => ({
      id: removed.id,
      ingredient_id: removed.productIngredient.ingredient.id,
      ingredient_name: removed.productIngredient.ingredient.name,
    }));

    return formattedRemoved;
  }
}

export { ListRemovedIngredientsService };
