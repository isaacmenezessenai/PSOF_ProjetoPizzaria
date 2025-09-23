import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type AdditionalItemProps = {
  title: string;
  price: number;
  image: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function AdditionalItem({
  title,
  price,
  image,
  value,
  onIncrement,
  onDecrement,
}: AdditionalItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Text>
      </View>

      <View style={styles.counter}>
        <TouchableOpacity onPress={onDecrement} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.value}>{value}</Text>

        <TouchableOpacity onPress={onIncrement} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
});
