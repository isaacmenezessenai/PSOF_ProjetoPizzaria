import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootStackParamList";
import BackButton from "../components/backButton";
import Divider from "../components/divider";
import OrderStatus from "../components/status/status";
import Table from "../components/status/table";
import { useTable } from "../contexts/TableContext";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "StatusPedido">;

export default function StatusPedido({ }: Props) {
  const { tableNumber } = useTable();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  const API_HOSTS = ["http://10.106.131.31:3333"];

  async function fetchFromAnyHost(path: string) {
    let lastErr: any = null;
    for (const host of API_HOSTS) {
      try {
        const res = await axios.get(`${host}${path}`);
        return res;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr;
  }

  useEffect(() => {
    async function loadOrder() {
      if (!tableNumber) {
        Alert.alert("Erro", "Nenhuma mesa vinculada.");
        return;
      }
      try {
        setLoading(true);

        // pega mesa pelo número
        const tableRes = await fetchFromAnyHost(`/table/find?number=${tableNumber}`);
        const tableData = tableRes?.data ?? {};
        const tableId = tableData.id ?? tableData.table?.id;
        if (!tableId) throw new Error("Mesa não encontrada.");

        // pega pedidos da mesa
        const ordersRes = await fetchFromAnyHost(`/table/${tableId}/orders`);
        const orders = ordersRes?.data ?? [];
        if (!Array.isArray(orders) || orders.length === 0) {
          throw new Error("Nenhum pedido encontrado para esta mesa.");
        }

        // último pedido
        const latest = orders[orders.length - 1];
        setOrder(latest);
      } catch (err: any) {
        console.error(err);
        Alert.alert("Erro", err?.message || "Não foi possível carregar o pedido.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [tableNumber]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#BCA85C" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Nenhum pedido encontrado.</Text>
      </View>
    );
  }

  // draft = aguardando pagamento
  if (order.draft) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Aguardando pagamento</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <BackButton />
      <View>
        <Text>
          Status do pedido
        </Text>
        <Table />
      </View>
      <Divider />
      <OrderStatus status={order.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF6ED",
  },
});
