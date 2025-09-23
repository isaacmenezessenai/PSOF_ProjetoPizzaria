import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";

export default function DetalhesProduto({ route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/details/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#9A1105" style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (!product) {
    return <Text>Produto não encontrado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.banner }} style={styles.banner} resizeMode="cover" />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {product.ingredients?.map((item: any, index: number) => (
        <View key={index} style={styles.ingredientRow}>
          <Image source={{ uri: item.ingredient.banner }} style={styles.ingredientImage} />
          <Text style={styles.ingredientText}>{item.ingredient.name} (+R$ {item.ingredient.price})</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#9A1105",
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: "#333",
  },
});
