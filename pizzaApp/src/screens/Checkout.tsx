import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { api } from "../services/api";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/Sacola";

type CheckoutRouteProp = RouteProp<RootStackParamList, "Checkout">;
type CheckoutNavProp = StackNavigationProp<RootStackParamList, "Checkout">;

export default function Checkout() {
  const route = useRoute<CheckoutRouteProp>();
  const navigation = useNavigation<CheckoutNavProp>();

  const { orderId } = route.params;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");

  async function handleConfirm() {
    setLoading(true);
    try {
      await api.patch("/order/draft", { order_id: orderId, draft: false });
      setStatus("pending");
      Alert.alert("Pedido enviado!", "Seu pedido foi enviado para a cozinha.");
      navigation.navigate("Pedidos");
    } catch (err: any) {
      let msg = "Não foi possível enviar o pedido.";
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Checkout</Text>
      <Text>Status do pedido: {status}</Text>
      <TouchableOpacity
        style={{ backgroundColor: "#BCA85C", padding: 16, borderRadius: 8, marginTop: 24 }}
        onPress={handleConfirm}
        disabled={loading}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          {loading ? "Processando..." : "Confirmar Pedido"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
