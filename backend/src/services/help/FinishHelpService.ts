import prismaClient from "../../prisma";

interface FinishRequestProps {
  table_id: string;
}

class FinishHelpService {
  async execute({ table_id }: FinishRequestProps) {
    
    const tableUpdated = await prismaClient.table.update({
      where: {
        id: table_id
      },
      data: {
        requesting_help: false 
      }
    })

    return tableUpdated;
  }
}

export { FinishHelpService }