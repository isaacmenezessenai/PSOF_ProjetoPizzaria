import prismaClient from "../../prisma";

interface FavoriteRequest{
    product_id: string;
    user_id: string;
}

class AddFavoriteService{
    async execute({ product_id, user_id }: FavoriteRequest){

        const favoriteExists = await prismaClient.favorites.findFirst({
            where:{
                product_id: product_id,
                users_id: user_id
            }
        });

        if(favoriteExists){
            throw new Error("Este produto já está nos seus favoritos.");
        }

        const favorite = await prismaClient.favorites.create({
            data:{
                product_id: product_id,
                users_id: user_id
            },
            include:{ 
                product: true,
                users:{
                    select:{
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return favorite;
    }
}

export { AddFavoriteService }