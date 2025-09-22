import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

// Tipagem das categorias
type Category = {
    id: string | number;
    name: string;
};

const api = axios.create({
    baseURL: "http://192.168.70.237:3333",
});

export default function CategoryNav() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);

    // Função para buscar as categorias
    async function fetchCategories() {
        try {
            const response = await api.get("/category");

            console.log("Categorias recebidas da API:", response.data);

            // Se a API retorna { categories: [...] }
            const data = Array.isArray(response.data)
                ? response.data
                : response.data.categories;

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

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={styles.categoryNavContainer}>
            {/* Lista de categorias */}
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
    );
}

const styles = StyleSheet.create({
    categoryNavContainer: {
        height: 80,
        marginTop: 20,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    categoryButtonActive: {
        borderBottomColor: "#000",
    },
    categoryText: {
        fontSize: 16,
        color: "#444",
    },
    categoryTextActive: {
        fontWeight: "bold",
        color: "#000",
    },
});
