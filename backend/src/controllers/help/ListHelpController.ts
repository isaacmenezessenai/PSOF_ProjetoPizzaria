import { Request, Response } from 'express'
import { ListHelpService } from '../../services/help/ListHelpService'

class ListHelpController {
  // Correção: Arrow function para o 'this' funcionar
  handle = async (req: Request, res: Response) => {
    const listHelpService = new ListHelpService();

    const helpRequests = await listHelpService.execute();

    // Correção: 'return' removido
    res.json(helpRequests);
  }
}

export { ListHelpController }