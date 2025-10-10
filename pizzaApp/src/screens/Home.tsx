import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { api } from "../services/api";
import { useTable } from "../contexts/TableContext"; 
// ! Components
import Chip from "../components/dashboard/chip";
import Divider from "../components/divider";
import MenuCompleto from "../components/dashboard/MenuCompleto";
import ImageButton from "../components/imageButton";
import Header from "../components/dashboard/header";
import PedidoAtivoFAB from "../components/PedidoAtivo";


export default function Home({ route }: any) {

  const { tableId } = useTable();

  const [temPedidoAtivo, setTemPedidoAtivo] = useState(false);

  useEffect(() => {
    if (!tableId) {
      console.warn(" Nenhum table_id recebido!");
      return;
    }

    async function verificarPedidoAtivo() {
      try {
        console.log(tableId);
        const response = await api.get(`/table/order?table_id=${tableId}`);

        console.log(response.data);

        if (response.data && response.data.length > 0) {
          setTemPedidoAtivo(true);
        } else {
          setTemPedidoAtivo(false);
        }
      } catch (error: any) {
        console.error(error.message);
        setTemPedidoAtivo(false);
      }
    }

    verificarPedidoAtivo();

    const interval = setInterval(verificarPedidoAtivo, 15000);
    return () => clearInterval(interval);
  }, [tableId]);

  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <ImageButton name="bag-handle-outline" size={55} navigateTo="Sacola" />
          </View>

          <Header />

          {/* Menu de atalhos */}
          <View style={styles.list}>
            <Chip
              title="Favoritos"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/o13ayzza_expires_30_days.png"
              navigateTo="Favoritos"
            />
            <Chip
              title="Meus Pedidos"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/ou3wlbab_expires_30_days.png"
              navigateTo="Pedidos"
            />
            <Chip
              title="Chamar Ajuda"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0ao7ngym_expires_30_days.png"
              navigateTo="Ajuda"
            />
            <Chip
              title="Perfil"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0x1aba14_expires_30_days.png"
              navigateTo="Perfil"
            />
          </View>

          <Divider />

          {/* Imagem de menu */}
          <View style={{ marginHorizontal: 20, marginBottom: 30, alignItems: "center" }}>
            <Image
              source={require("../../assets/img/menu.png")}
              style={{ width: 150, height: 50, resizeMode: "contain" }}
            />
          </View>

          <MenuCompleto />
        </View>
      </ScrollView>

      {/* Botão flutuante de pedido ativo */}
      <PedidoAtivoFAB temPedidoAtivo={temPedidoAtivo} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#FAF6ED",
  },
  container: {
    justifyContent: "center",
    marginTop: 30,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 5,
  },
  header: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
});
