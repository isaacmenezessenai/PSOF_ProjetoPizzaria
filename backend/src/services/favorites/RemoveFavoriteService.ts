import prismaClient from "../../prisma";

interface RemoveFavoriteRequest{
    favorites_id: string
}

class RemoveFavoriteService {
    async execute ({favorites_id} : RemoveFavoriteRequest){
        const Favorite = await prismaClient.favorites.delete({
            where:{
                id : favorites_id
            }
        })

        return Favorite

    }

}

export {RemoveFavoriteService}