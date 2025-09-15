import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import { api } from "./src/services/api";
import type { Category, Product } from "./src/types";
import { CategoryChips } from "./src/components/CategoryChips";
import { ProductCard } from "./src/components/ProductCard";

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const res = await api.get<Category[]>("/categories");
        setCategories(res.data);
        if (res.data.length > 0) setSelectedCategory(res.data[0].id);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const loadProducts = useCallback(async (categoryId: string | null) => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    try {
      setLoadingProducts(true);
      const res = await api.get<Product[]>("/category/products", { params: { category_id: categoryId } });
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory, loadProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts(selectedCategory);
    setRefreshing(false);
  }, [selectedCategory, loadProducts]);

  if (loadingCategories) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#9A1105" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryChips
        categories={categories}
        selectedId={selectedCategory ?? undefined}
        onSelect={(id) => setSelectedCategory(id)}
      />

      {loadingProducts ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#9A1105" /></View>
      ) : products.length === 0 ? (
        <View style={styles.center}><Text>Nenhum produto encontrado nessa categoria.</Text></View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <ProductCard product={item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAF6ED" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
