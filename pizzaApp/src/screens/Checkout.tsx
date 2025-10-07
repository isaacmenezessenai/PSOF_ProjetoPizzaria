import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BackButton from "../components/backButton";
import Divider from "../components/divider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootStackParamList";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function Checkout({ route, navigation }: Props) {
  const { orderId } = route.params;
  const { setItems } = useCart();
  const [loading, setLoading] = React.useState(false);

  async function handlePayment() {
    try {
      setLoading(true);
      // Envia o pedido ao backend (finaliza)
      await api.put("/order/send", { order_id: orderId });

      // Só limpa a sacola depois que o pedido é confirmado
      setItems([]);

      Alert.alert("Pagamento", "Pagamento realizado com sucesso!");
      navigation.navigate("StatusPedido", { draft: false, status: false });
    } catch (error: any) {
      console.error(error);
      const msg =
        error.response?.data?.error ??
        "Não foi possível finalizar o pagamento. Tente novamente.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Checkout</Text>
      <Divider />
      <Text style={styles.label}>Pedido: {orderId}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: loading ? "#ccc" : "#BCA85C" },
        ]}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Processando..." : "Finalizar Pagamento"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6ED",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    fontFamily: "NeueHaas",
  },
  label: {
    fontSize: 18,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#BCA85C",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
