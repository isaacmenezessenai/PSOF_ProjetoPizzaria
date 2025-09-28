import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import BackButton from "../components/cart/backButton";
import Divider from "../components/divider";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductProps } from "../components/dashboard/card";
import Card from "../components/cart/card";

type RootStackParamList = {
  Sacola: undefined;
  Detalhes: { product: ProductProps; index?: number };
};

type SacolaScreenProp = StackNavigationProp<RootStackParamList, "Sacola">;

export default function Sacola() {
  const { items, setItems } = useCart();
  const navigation = useNavigation<SacolaScreenProp>();

  function handleRemove(index: number) {
    Alert.alert("Remover", "Deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setItems(items.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  function handleEdit(item: any, index: number) {
    navigation.navigate("Detalhes", { product: item.product, index });
  }

  function handleChangeQty(index: number, delta: number) {
  setItems(items => {
    const newItems = [...items];
    const item = newItems[index];
    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      Alert.alert(
        "Remover",
        "Deseja remover este item?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Remover",
            style: "destructive",
            onPress: () => {
              const updated = [...newItems];
              updated.splice(index, 1);
              setItems(updated);
            },
          },
        ]
      );
      return items; // não aplica nada até o usuário confirmar
    } else {
      newItems[index] = { ...item, quantity: newQty };
      return newItems;
    }
  });
}

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6ED" }}>

      <View style={{ marginTop: 40, marginLeft: 20, alignSelf: "flex-start" }}>
        <BackButton />
      </View>

      <Text style={styles.title}>Sacola</Text>

      <Divider />

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <Card
            product={item.product}
            quantity={item.quantity}
            onEdit={() => handleEdit(item, index)}
            onRemove={() => handleRemove(index)}
            onChangeQty={(delta) => handleChangeQty(index, delta)}
          />
        )}

      ListEmptyComponent={
        <Text style={{ textAlign: "center", fontSize: 16, color: "#888", alignSelf: "center" }}>
          Sua sacola está vazia.
        </Text>
      }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    fontFamily: "NeueHaas",
  },
  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDesc: {
    fontSize: 14,
    color: "#888",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  qtyBtn: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  editBtn: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: "#BCA85C",
    borderRadius: 6,
  },
  removeBtn: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: "#9A1105",
    borderRadius: 6,
  },
});
