import { Request, Response } from "express";
import { GetTableByNumberService } from "../../services/table/GetTablebyNumberService";

class GetTableByNumberController {
    async handle(req: Request, res: Response) {
        const { number } = req.params;

        const service = new GetTableByNumberService();

        const table = await service.execute({ number: Number(number) });

        if (!table) {
            return res.status(404).json({ error: "Mesa não encontrada" });
        }

        return res.json(table);
    }
}

export { GetTableByNumberController };
