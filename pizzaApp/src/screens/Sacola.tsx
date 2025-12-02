import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "../components/divider";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Card from "../components/cart/card";
import BackButton from "../components/backButton";
import { ProductProps } from "../components/dashboard/MenuCompleto";
import { api } from "../services/api";
import { useTable } from "../contexts/TableContext";
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  Sacola: undefined;
  Detalhes: { product: ProductProps; index?: number };
  Checkout: { orderId: string };
  Pedidos: undefined;
};

type SacolaScreenProp = StackNavigationProp<RootStackParamList, "Sacola">;

export default function Sacola() {
  const { items, setItems } = useCart();
  const { tableNumber, tableId } = useTable();
  const navigation = useNavigation<SacolaScreenProp>();
  const [loading, setLoading] = React.useState(false);
  const [observation, setObservation] = React.useState("");

  const total = items.reduce((acc, item) => {
    const extrasPrice = item.extras?.reduce((extraAcc, extra) => {
    const price = parseFloat(extra.price) || 0;
    return extraAcc + price;
  }, 0) || 0;
    const itemPrice = parseFloat(item.product.price) + extrasPrice;
    return acc + (itemPrice * item.quantity);
  }, 0);

  async function handleCheckout() {
    if (!tableId || !tableNumber) { 
      Alert.alert("Mesa não definida", "Escaneie o QR Code da mesa antes de continuar.");
      return;
    }
    if (items.length === 0) {
      Alert.alert("Sacola vazia", "Adicione itens antes de continuar.");
      return;
    }
    
    setLoading(true);
    try {
      const itemsPayload = items.map((i) => ({
        product_id: i.product.id,
        amount: i.quantity,
      }));

      for (const it of itemsPayload) {
        if (!it.product_id || typeof it.product_id !== "string" || it.product_id.length < 3) {
          throw new Error("Produto inválido na sacola. Confirme se todos os produtos existem no banco.");
        }
      }

      const createBody = {
        table_id: tableId,
        name: "",
        observation: observation,
        items: itemsPayload,
        products: itemsPayload,
      };

      const orderRes = await api.post("/order", createBody);
      const data = orderRes.data ?? {};
      const order = data.order ?? data;
      const orderId = order?.id;

      if (!orderId) {
        throw new Error("Resposta inesperada do servidor: " + JSON.stringify(data));
      }

      if (!order.items || order.items.length === 0) {
        for (let i = 0; i < itemsPayload.length; i++) {
          const it = itemsPayload[i];
          try {
            const addRes = await api.post("/order/add", {
              order_id: orderId,
              product_id: it.product_id,
              amount: it.amount,
            });

            // obtém o item criado e seu id
            const createdItem = addRes.data ?? null;
            const itemId = createdItem?.id ?? createdItem;
            console.log('Created item from /order/add:', createdItem, 'resolved itemId=', itemId);

            // adiciona extras associados ao item criado (uma chamada por extra selecionado)
            const cartItem = items[i];
            if (cartItem?.extras && Array.isArray(cartItem.extras)) {
              for (const extra of cartItem.extras) {
                try {
                  await api.post("/extra/add", {
                    item_id: itemId,
                    extra_id: extra.id,
                  });
                } catch (err) {
                  console.warn("Não foi possível adicionar extra via /extra/add:", err);
                }
              }
            }
            // adiciona ingredientes removidos na tabela productIngredientRemoved
            if (cartItem?.removedIngredients && Array.isArray(cartItem.removedIngredients)) {
              for (const prodIngredientId of cartItem.removedIngredients) {
                try {
                  const payload = { items_id: String(itemId), productIngredient_id: String(prodIngredientId) };
                  console.log('Registering removed ingredient:', payload);
                  const remRes = await api.post('/item/ingredient/remove', payload);
                  console.log('Removed ingredient response:', remRes.data);
                } catch (err) {
                  console.warn('Não foi possível registrar ingrediente removido:', err);
                }
              }
            }
          } catch (err) {
            console.warn("Não foi possível adicionar item via /order/add:", err);
          }
        }
      }

      navigation.navigate("Checkout", { orderId });
    } catch (err: any) {
      let msg = "Não foi possível criar o pedido.";
      if (err.response?.data?.error) {
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
    setItems((items) => {
      const newItems = [...items];
      const item = newItems[index];
      const newQty = item.quantity + delta;

      if (newQty <= 0) {
        Alert.alert("Remover", "Deseja remover este item?", [
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
        ]);
        return items;
      } else {
        newItems[index] = { ...item, quantity: newQty };
        return newItems;
      }
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6ED" }}>
      <View style={{ marginTop: 40, marginLeft: 20, alignSelf: "flex-start" }}>

      <View style={[styles.headerRow]}>
      <BackButton />
      </View>

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
            extras={item.extras}
            removedIngredients={item.removedIngredients}
            onEdit={() => handleEdit(item, index)}
            onRemove={() => handleRemove(index)}
            onChangeQty={(delta) => handleChangeQty(index, delta)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", fontSize: 16, color: "#888" }}>
            Sua sacola está vazia.
          </Text>
        }
      />

      <SafeAreaView
        edges={["bottom"]}
        style={{
          padding: 24,
          borderTopWidth: 1,
          borderColor: "#eee",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Observações (opcional):
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
            }}
            placeholder="Ex: Sem cebola, bem passado..."
            value={observation}
            onChangeText={setObservation}
            multiline
            numberOfLines={2}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 16 }}>Total:</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text>R$</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {total.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: items.length === 0 || loading ? "#ccc" : "#CF8E18",
            padding: 12,
            borderRadius: 100,
            alignItems: "center",
            marginTop: 8,
            width: "50%",
            alignSelf: "center",
          }}
          disabled={items.length === 0 || loading}
          onPress={handleCheckout}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "900" }}>
            {loading ? "..." : "Pagar Agora"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    marginTop: -10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingLeft: 10,
  },
  backButton: {
    padding: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
});
