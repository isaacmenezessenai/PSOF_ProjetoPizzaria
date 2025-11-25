import prismaClient from "../../prisma";

interface Request {
  item_id: string;
}

class ListItemExtraService {
  async execute({ item_id }: Request) {
    const extras = await prismaClient.itemExtra.findMany({
      where: {
        item_id: item_id,
      },
      select:{
        id: true,
        extra: true,
      }

    });

    return extras;
  }
}

export { ListItemExtraService };
