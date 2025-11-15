import { Request, Response } from "express";
import { CreateUsersClientService } from "../../services/usersClient/CreateUserClientService";
import { validarCPF } from "../../utils/validation";
import prismaClient from "../../prisma";

class CreateUserClientController {
    async handle(req: Request, res: Response) {
        const { name, email, password, cpf, dataNascimento } = req.body;

        // Validação inicial e única
        if (!name || !email || !password || !cpf || !dataNascimento) {
            return res.status(400).json({ error: "Todos os campos (name, email, password, cpf, dataNascimento) são obrigatórios." });
        }

        //  1. Validação do CPF
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: "O CPF fornecido é inválido." });
        }

        // 2. Checagem de Usuário Existente (Email ou CPF)
        try {
            const userAlreadyExists = await prismaClient.usersClient.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { cpf: cpf }
                    ]
                }
            });

            if (userAlreadyExists) {
                return res.status(400).json({ error: "Usuário já cadastrado (e-mail ou CPF)." });
            }

            // 3. Conversão e Validação da Data de Nascimento
            let dataNascimentoDate: Date;
            const dataString = String(dataNascimento);
            
            // formato DD/MM/AAAA
            const regexDDMMAAAA = /^(\d{2})[/\-](\d{2})[/\-](\d{4})$/;
            const match = dataString.match(regexDDMMAAAA);

            if (match) {
                //  DD/MM/AAAA para YYYY-MM-DD para garantir a interpretação correta pelo construtor Date
                const dataAmericanaString = `${match[3]}-${match[2]}-${match[1]}`;
                dataNascimentoDate = new Date(dataAmericanaString);
            } else {
                // Se não casar com DD/MM/AAAA, tenta criar a data a partir da string bruta (para formatos ISO, etc.)
                dataNascimentoDate = new Date(dataString);
            }

            // Verifica se a data é válida (ex: 30 de fevereiro)
            if (isNaN(dataNascimentoDate.getTime())) {
                return res.status(400).json({ error: "Formato de data de nascimento inválido. Use o formato dd/mm/aaaa ou ISO 8601."});
            }

            // 4. Criação do Serviço
            const createUserService = new CreateUsersClientService();
            
            const user = await createUserService.execute({
                name,
                email,
                password,
                cpf,
                dataNascimento: dataNascimentoDate, 
            });

            return res.json(user);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido durante o cadastro.";
            return res.status(400).json({ error: errorMessage });
        }
    }
}

export { CreateUserClientController };