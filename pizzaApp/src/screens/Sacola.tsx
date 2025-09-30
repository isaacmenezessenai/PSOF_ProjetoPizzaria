import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import BackButton from "../components/cart/backButton";
import Divider from "../components/divider";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductProps } from "../components/dashboard/card";
import Card from "../components/cart/card";
import { api } from "../services/api";
import { useTable } from "../contexts/TableContext";

export type RootStackParamList = {
  Sacola: undefined;
  Detalhes: { product: ProductProps; index?: number };
  Checkout: { orderId: string };
  Pedidos: undefined; 
};

type SacolaScreenProp = StackNavigationProp<RootStackParamList, "Sacola">;

export default function Sacola() {
  const { items, setItems } = useCart();
  const { tableNumber } = useTable();
  const navigation = useNavigation<SacolaScreenProp>();
  const [loading, setLoading] = React.useState(false);

  // Calcular total
  const total = items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  async function handleCheckout() {
    setLoading(true);
    try {
      // Buscar id da mesa pelo número
      const tableRes = await api.get(`/table/by-number?number=${tableNumber}`);
      const tableId = tableRes.data.id;
      // Cria a order no backend
      const orderRes = await api.post("/order", {
        table_id: tableId,
        name: `Mesa ${tableNumber}`,
        observation: "",
      });
      const orderId = orderRes.data.id;
      // Adiciona os itens
      for (const item of items) {
        await api.post("/order/add", {
          order_id: orderId,
          product_id: item.product.id,
          amount: item.quantity,
        });
      }
      // Limpa sacola e vai para checkout
      setItems([]);
      navigation.navigate("Checkout", { orderId });
    } catch (err: any) {
      let msg = "Não foi possível criar o pedido.";
      if (err?.response?.data?.error) {
        msg += `\n${err.response.data.error}`;
      } else if (err?.message) {
        msg += `\n${err.message}`;
      }
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

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

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
          Total: R$ {total.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "#BCA85C", padding: 16, borderRadius: 8, alignItems: "center" }}
          onPress={handleCheckout}
          disabled={items.length === 0 || loading}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {loading ? "Processando..." : "Seguir para checkout"}
          </Text>
        </TouchableOpacity>
      </View>

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
