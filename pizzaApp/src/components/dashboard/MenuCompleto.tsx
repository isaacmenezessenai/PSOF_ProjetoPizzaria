import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../../services/api"
import Card from "../dashboard/card";

type Category = {
    id: string;
    name: string;
};

export interface ProductProps {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
}

export default function MenuCompleto() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await api.get("/category");
                const data = response.data;

                if (!data || data.length === 0) {
                    Alert.alert("Aviso", "Nenhuma categoria encontrada.");
                    return;
                }

                setCategories(data);

                setSelectedCategory(data[0].id);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                Alert.alert("Erro", "Não foi possível carregar as categorias.");
            }
        }
        fetchCategories();
    }, []);

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);


    useEffect(() => {
        if (!selectedCategory) {
            return;
        }

        async function fetchProductsByCategory() {
            setLoadingProducts(true);
            try {
                const response = await api.get('/category/product', {
                    params: {
                        category_id: selectedCategory
                    }
                });
                const productsData = response.data;

                const productsWithIngredients = await Promise.all(
                    productsData.map(async (product: any) => {
                        try {
                            const ingRes = await api.get(`/products/${product.id}/ingredients`);
                            return { ...product, ingredients: ingRes.data };
                        } catch {
                            return { ...product, ingredients: [] };
                        }
                    })
                );
                setProducts(productsWithIngredients);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        }

        fetchProductsByCategory();
    }, [selectedCategory]);

    return (
        <View>
            <View style={styles.categoryNavContainer}>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.categoryButton}
                            onPress={() => setSelectedCategory(item.id)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    item.id === selectedCategory && styles.categoryTextActive,
                                ]}
                            >
                                {item.name}
                            </Text>
                            {item.id === selectedCategory && <View style={styles.textUnderline} />}
                        </TouchableOpacity>

                    )}
                />
            </View>

            <View style={styles.productListContainer}>
                {loadingProducts ? (
                    <Text style={styles.infoText}>Carregando produtos...</Text>
                ) : (
                    products.map(product => (
                        <Card key={product.id} data={product} />
                    ))
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
    },
    infoText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#666',
    },
});
