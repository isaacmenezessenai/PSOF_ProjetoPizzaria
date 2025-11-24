import prismaClient from "../../prisma";
import { hash } from "bcryptjs"; 
import nodemailer from "nodemailer";

interface Request {
    email: string;
    newPassword: string; // Adicionado na interface
}

class ResetPasswordService {
    async execute({ email, newPassword }: Request) {

        // 1. Verifica se o usuário existe
        const user = await prismaClient.usersClient.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("Email não encontrado");
        }

        // 2. CRIPTOGRAFA A SENHA QUE O USUÁRIO ENVIOU
        // (Não gera mais aleatória, usa a newPassword)
        const passwordHash = await hash(newPassword, 8);

        // 3. ATUALIZA NO BANCO
        await prismaClient.usersClient.update({
            where: { id: user.id },
            data: {
                password: passwordHash
            }
        });

        // 4. (Opcional) Envia email avisando que mudou
        // Se quiser tirar isso pra ganhar tempo, pode apagar daqui pra baixo
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: '"Pizzaria" <nao-responda@pizzaria.com>',
                to: user.email,
                subject: "Senha Alterada",
                html: `<p>Sua senha foi alterada com sucesso para a senha que você escolheu.</p>`,
            });
        } catch (err) {
            // Se der erro no email, não trava o app, só loga
            console.log("Erro ao enviar email de aviso", err);
        }

        return { message: "Senha atualizada com sucesso!" };
    }
}

export { ResetPasswordService };