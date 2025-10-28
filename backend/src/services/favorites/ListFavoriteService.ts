import prismaClient from "../../prisma";

class ListFavoritesService {
  async execute(users_id: string) {

    const favorites = await prismaClient.favorites.findMany({
      where: {
        users_id: users_id
      },
      orderBy:{
        created_at: 'desc'
      },
      include: {
        product: true 
      }
    });

    return favorites;
  }
}

export { ListFavoritesService };