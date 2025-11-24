import prismaClient from "../../prisma";

class ListHelpService {
  async execute() {
    const tablesNeedingHelp = await prismaClient.table.findMany({
      where: {
        requesting_help: true, 
      },
      select: {
        id: true,
        number: true,
        requesting_help: true
      }
    })

    return tablesNeedingHelp;
  }
}

export { ListHelpService }