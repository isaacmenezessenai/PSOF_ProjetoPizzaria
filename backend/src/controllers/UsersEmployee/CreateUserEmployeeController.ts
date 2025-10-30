import { Request, Response } from "express";

import { CreateUserEmployeeService } from "../../services/UsersEmployee/CreateUserEmployeeService"; 

import { validarCPF } from "../../utils/validation"; 
import prismaClient from "../../prisma"; 

class CreateUserEmployeeController {
    async handle(req: Request, res: Response) {
        
        const { name, email, password, cpf, dataNascimento, jobRoleId } = req.body;


        // 1. VALIDAÇÃO INICIAL DE CAMPOS OBRIGATÓRIOS
        if (!name || !email || !password || !cpf || !dataNascimento || !jobRoleId) {
            return res.status(400).json({ error: "Todos os campos (name, email, password, cpf, dataNascimento, jobRoleId) são obrigatórios para o cadastro de empregado." });
        }

        // 2. VALIDAÇÃO E FORMATAÇÃO DE CPF
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: "O CPF fornecido é inválido." });
        }

        try {

            // 3. VALIDAÇÃO E CONVERSÃO DA DATA DE NASCIMENTO
            let dataNascimentoDate: Date;
            const dataString = String(dataNascimento);
            
            const regexDDMMAAAA = /^(\d{2})[/\-](\d{2})[/\-](\d{4})$/;
            const match = dataString.match(regexDDMMAAAA);

            if (match) {
                const dataAmericanaString = `${match[3]}-${match[2]}-${match[1]}`;
                dataNascimentoDate = new Date(dataAmericanaString);
            } else {
                dataNascimentoDate = new Date(dataString);
            }

            if (isNaN(dataNascimentoDate.getTime())) {
                return res.status(400).json({ error: "Formato de data de nascimento inválido. Use o formato dd/mm/aaaa ou ISO 8601." });
            }

            // 4. CHAMADA AO SERVIÇO
            const createUserEmployeeService = new CreateUserEmployeeService();

            const userEmployee = await createUserEmployeeService.execute({
                name,
                email,
                password,
                cpf,
                dataNascimento: dataNascimentoDate, 
                jobRoleId: jobRoleId, 
            });

            return res.status(201).json(userEmployee); 

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido durante o cadastro do empregado.";
            return res.status(400).json({ error: errorMessage });
        }
    }
}

export { CreateUserEmployeeController };