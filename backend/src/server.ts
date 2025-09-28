import express, {Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes'
import tableRoutes from './routes/table'
import qrCodeRoutes from './routes/qrcode'
import fileUpload from 'express-fileupload'

const app = express();
app.use(express.json());
app.use(cors());
app.use("/tables", tableRoutes);
app.use("/qrcode", qrCodeRoutes);
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}))
app.use(router)

//Acessar url da Imagem ex: localhost:3333/files/nome-imagem.png
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){

        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status:'error',
        message: 'Internal server error'
    })
})

app.listen(3333, () => console.log('Servidor online!'))