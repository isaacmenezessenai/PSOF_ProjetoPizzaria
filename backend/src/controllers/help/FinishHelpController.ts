import { Request, Response } from 'express'
import { FinishHelpService } from '../../services/help/FinishHelpService'

class FinishHelpController {
  // Correção: Arrow function para o 'this' funcionar
  handle = async (req: Request, res: Response) => {
    const { help_id } = req.body; 

    const finishHelpService = new FinishHelpService();

    const result = await finishHelpService.execute({
      table_id: help_id
    });

    // Correção: 'return' removido
    res.json(result);
  }
}

export { FinishHelpController }