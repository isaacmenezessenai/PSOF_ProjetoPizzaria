import prismaClient from "../../prisma";

interface HelpRequestProps {
  tableNumber: number;
}

class CreateHelpService {
  async execute({ tableNumber }: HelpRequestProps) {
    const tableItem = await prismaClient.table.findFirst({
      where: {
        number: tableNumber
      }
    })

    if (!tableItem) {
      throw new Error("Mesa não encontrada");
    }

    const tableUpdated = await prismaClient.table.update({
      where: {
        id: tableItem.id
      },
      data: {
        requesting_help: true
      }
    })

    return tableUpdated;
  }
}

export { CreateHelpService }