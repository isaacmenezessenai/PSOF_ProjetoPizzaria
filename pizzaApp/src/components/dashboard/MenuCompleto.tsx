import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../../services/api";
import Card, { ProductProps as CardProductProps } from "../dashboard/card";

export interface ProductProps extends CardProductProps {}

export default function MenuCompleto() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Buscar categorias
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
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      }
    }
    fetchCategories();
  }, []);

  // Buscar produtos da categoria selecionada
  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchProductsByCategory() {
      setLoadingProducts(true);
      try {
        const response = await api.get("/category/product", {
          params: { category_id: selectedCategory },
        });
        const productsData = response.data;

        const productsWithIngredients = await Promise.all(
          productsData.map(async (product: ProductProps) => {
            try {
              const ingRes = await api.get("/ingredients/product", {
                params: { product_id: product.id },
              });
              return { ...product, ingredients: ingRes.data };
            } catch (err) {
              console.error(`Erro ao buscar ingredientes do produto ${product.id}:`, err);
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
    <View style={styles.container}>
      {/* Navegação de categorias */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.categoryNavContainer}
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

      {/* Lista de produtos */}
      {loadingProducts ? (
        <Text style={styles.infoText}>Carregando produtos...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Card data={item} />}
          ListEmptyComponent={
            <Text style={styles.infoText}>Nenhum produto encontrado nesta categoria.</Text>
          }
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false} // garante que não haverá listas aninhadas
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryNavContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontFamily: "NeueHaas",
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
  infoText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#666",
  },
});