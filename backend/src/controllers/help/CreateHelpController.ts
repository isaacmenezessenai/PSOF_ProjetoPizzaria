import { Request, Response } from 'express';
import { CreateHelpService } from '../../services/help/CreateHelpService';

class CreateHelpController {
  // Arrow function mantida
  handle = async (req: Request, res: Response) => {
    const { table } = req.body; 

    const createHelpService = new CreateHelpService();

    const helpRequest = await createHelpService.execute({
      tableNumber: Number(table) 
    });

    // Sem o 'return' aqui
    res.json(helpRequest);
  }
}

export { CreateHelpController }