import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import type { Product } from "../types";

type Props = {
  product: Product;
  onPress?: () => void;
};

export const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const priceNum = Number(product.price?.toString().replace(",", "."));
  const priceString = !isNaN(priceNum) ? `R$ ${priceNum.toFixed(2).replace(".", ",")}` : `R$ ${product.price}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.banner }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{priceString}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: "100%", height: 110, borderRadius: 8, marginBottom: 8, backgroundColor: "#f0f0f0" },
  title: { fontWeight: "700" },
  price: { color: "#666", marginTop: 6 },
});
