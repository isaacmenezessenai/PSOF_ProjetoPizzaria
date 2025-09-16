export type CategoryProps = {
    id: string;
    name: string;
};

export type ProductProps = {
    id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
};

export type ProductCardProps = {
    product: ProductProps;
    isFavorite?: boolean;
    onFavoritePress: (productId: string) => void;
    onOrderPress: (product: ProductProps) => void;
};