import { Request, Response } from "express";
import { CreateIngredientService } from "../../services/ingredients/CreateIngredientService";
import {UploadedFile} from 'express-fileupload'

import { v2 as cloudinary, UploadApiResponse} from 'cloudinary'
class CreateIngredientController {
    async handle(req: Request, res: Response): Promise<Response | void> {
        try {
            const { name, price, extra } = req.body;

            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Nenhum arquivo de imagem enviado.");
            }

            const file: UploadedFile = req.files['file'] as UploadedFile;

            // --- Validação do tipo de arquivo ---
            if (file.mimetype !== 'image/png') {
                throw new Error("Formato de arquivo inválido. Apenas imagens PNG são permitidas.");
            }

            // A lógica de upload para o Cloudinary continua a mesma
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });

            const createIngredientService = new CreateIngredientService();

            const ingredient = await createIngredientService.execute({
                name,
                price: Number(price),
                banner: resultFile.url,
                extra
            });

            return res.json(ingredient);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { CreateIngredientController };