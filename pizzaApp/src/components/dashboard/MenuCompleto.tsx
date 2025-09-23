import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../../services/api"
import Card from "../card";


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
                setProducts(response.data);
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
                            style={[
                                styles.categoryButton,
                                item.id === selectedCategory && styles.categoryButtonActive,
                            ]}
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
        height: 60, // Ajustado
        paddingLeft: 10,
    },
    categoryButton: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    categoryButtonActive: {
        borderBottomColor: "#9A1105",
    },
    categoryText: {
        fontSize: 16,
        color: "#444",
    },
    categoryTextActive: {
        fontWeight: "bold",
        color: "#000",
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
