import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BackButton from "../components/backButton";
import Divider from "../components/divider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootStackParamList";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function Checkout({ route, navigation }: Props) {
  const { orderId } = route.params;

  const API_HOSTS = ["http://10.106.131.31:3333"];

  async function postToAnyHost(path: string, body: any) {
    let lastErr: any = null;
    for (const host of API_HOSTS) {
      try {
        const res = await axios.put(`${host}${path}`, body); // aqui é PUT
        return res;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr;
  }

  async function handlePayment() {
    try {
      // chama o controller SendOrderController (provavelmente rota /order/send)
      await postToAnyHost("/order/send", { order_id: orderId });

      Alert.alert("Pagamento", "Pagamento realizado com sucesso!");
      navigation.navigate("StatusPedido", { draft: false, status: false });
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível finalizar o pagamento.");
    }
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Checkout</Text>
      <Divider />
      <Text style={styles.label}>Pedido: {orderId}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Finalizar Pagamento</Text>
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
