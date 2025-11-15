import prismaClient from "../../prisma";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface RemoveFavoriteRequest{
    favorites_id: string
}

class RemoveFavoriteService {
    async execute ({favorites_id} : RemoveFavoriteRequest){
        
        if (!favorites_id) {
            throw new Error("Favorite ID is required.");
        }

        try {
            const Favorite = await prismaClient.favorites.delete({
                where:{
                    id : favorites_id
                }
            });
            
            return {
                message: "Favorito removido com sucesso",
                favorite: Favorite
            };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Favorito não encontrado");
            }
            throw error;
        }
    }

}

export {RemoveFavoriteService}