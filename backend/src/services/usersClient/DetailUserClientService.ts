import prismaClient from "../../prisma";

class DetailUsersClientService {
    async execute(user_id: string) {

        // 1. O modelo alvo deve ser 'usersClient'
        // ✅ CORREÇÃO: Trocamos findFirst por findUnique, que é o método correto
        // para buscar um registro pela sua chave primária (ID), garantindo maior robustez.
        const user = await prismaClient.usersClient.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,            
                dataNascimento: true, 
                created_at: true,     
                update_at: true,      
                // 2. Incluindo a lista de favoritos (relacionamento)
                favorites: {
                    select: {
                        id: true,
                        product_id: true,
                        users_id: true
                    }
                }
            }
        });

        // 3. Validação para verificar se o usuário foi encontrado
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return user;
    }
}

export { DetailUsersClientService };