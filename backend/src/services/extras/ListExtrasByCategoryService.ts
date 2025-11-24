import prismaClient from "../../prisma";

interface Request {
  category_id: string;
}

class ListExtrasByCategoryService {
  async execute({ category_id }: Request) {
    const extras = await prismaClient.extras.findMany({
      where: {
        category_id: category_id,
      }
    });

    return extras;
  }
}

export { ListExtrasByCategoryService };
