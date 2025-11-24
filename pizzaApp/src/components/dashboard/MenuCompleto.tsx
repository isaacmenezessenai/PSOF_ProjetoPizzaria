import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import { api } from "../../services/api";

// Importa o Card que acabamos de editar (que está na mesma pasta)
import Card, { ProductProps } from "./card"; 

type Category = {
    id: string;
    name: string;
};

// Tipo do favorito vindo da API
type FavoriteItem = {
    id: string; 
    product: {
        id: string;
    };
};

export default function MenuCompleto() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    // Estados
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // 1. Carregar Categorias
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await api.get("/category");
                const data = response.data;

                if (!data || data.length === 0) {
                    return;
                }
                setCategories(data);
                setSelectedCategory(data[0].id);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategories();
    }, []);

    // 2. Carregar Favoritos (Sempre que focar na tela)
    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    async function loadFavorites() {
        try {
            const response = await api.get("/favorites");
            setFavorites(response.data);
        } catch (error) {
            console.log("Erro ao carregar favoritos:", error);
        }
    }

    // 3. Carregar Produtos da Categoria
    useEffect(() => {
        if (!selectedCategory) return;

        async function fetchProducts() {
            setLoadingProducts(true);
            try {
                const response = await api.get("/category/product", {
                    params: { category_id: selectedCategory }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoadingProducts(false);
            }
        }
        fetchProducts();
    }, [selectedCategory]);

    // 4. Lógica Toggle Favorito
    async function handleToggleFavorite(product: ProductProps) {
        const favoriteEntry = favorites.find(fav => fav.product.id === product.id);

        if (favoriteEntry) {
            // REMOVER
            try {
                setFavorites(old => old.filter(fav => fav.id !== favoriteEntry.id));
                await api.delete('/favorite', { data: { favorites_id: favoriteEntry.id } });
            } catch (err) {
                console.log("Erro ao remover favorito", err);
                loadFavorites(); 
            }
        } else {
            // ADICIONAR
            try {
                // UI Otimista temporária (opcional, mas ajuda na percepção de velocidade)
                const tempId = "temp_" + Math.random();
                setFavorites(old => [...old, { id: tempId, product: { id: product.id } }]);

                const response = await api.post('/favorite', { product_id: product.id });
                
                // Atualiza com o dado real do backend
                setFavorites(old => old.map(fav => fav.id === tempId ? response.data : fav));
            } catch (err) {
                console.log("Erro ao adicionar favorito", err);
                loadFavorites(); // Recarrega para corrigir estado
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Navegação de Categorias */}
            <View style={styles.categoryNavContainer}>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.categoryButton}
                            onPress={() => setSelectedCategory(item.id)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === item.id && styles.categoryTextActive,
                                ]}
                            >
                                {item.name}
                            </Text>
                            {selectedCategory === item.id && <View style={styles.textUnderline} />}
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Lista de Produtos */}
            <View style={styles.productListContainer}>
                {loadingProducts ? (
                    <ActivityIndicator size="large" color="#9A1105" style={{ marginTop: 20 }} />
                ) : (
                    products.map(product => {
                        // Verifica se é favorito
                        const isFav = favorites.some(fav => fav.product.id === product.id);

                        return (
                            <Card 
                                key={product.id} 
                                data={product} // <--- AQUI MANTEMOS 'data' pois o Card espera 'data'
                                isFavorite={isFav}
                                onToggleFavorite={() => handleToggleFavorite(product)}
                            />
                        );
                    })
                )}
                {!loadingProducts && products.length === 0 && (
                    <Text style={styles.infoText}>Nenhum produto encontrado nesta categoria.</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryNavContainer: {
        height: 30,
        paddingLeft: 10,
        marginTop: -15,
    },
    categoryButton: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        // fontFamily: "NeueHaas",
        fontSize: 16,
        color: "#444",
    },
    categoryTextActive: {
        fontWeight: "bold",
        color: "#000",
    },
    textUnderline: {
        height: 2,
        backgroundColor: "#9A1105",
        alignSelf: "flex-start",
        width: "100%",
        marginTop: 2,
    },
    productListContainer: {
        marginTop: 20,
        paddingBottom: 20,
    },
    infoText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20
    }
});