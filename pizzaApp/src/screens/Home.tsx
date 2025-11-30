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
// Importamos o componente ajustado
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
          
          {/* Cabeçalho que rola junto com a tela */}
          <View style={styles.header}>
            {/* Agrupamos o Sino e a Sacola numa linha */}
            <View style={styles.headerIconsContainer}>
              {/* O Sino (só aparece se houver pedido ativo) */}
              <PedidoAtivoFAB />
              
              {/* A Sacola */}
              <ImageButton name="bag-handle-outline" size={55} navigateTo="Sacola" />
            </View>
          </View>

          <Header />

          {/* Menu de atalhos */}
          <View style={styles.list}>
            <Chip
              title="Favoritos"
              image="https://res.cloudinary.com/dzsoh6zq7/image/upload/v1764462780/myorders_ikt8xx.png"
              navigateTo="Favoritos"
            />
            {/*<Chip
              title="Meus Pedidos"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/ou3wlbab_expires_30_days.png"
              navigateTo="Pedidos"
            />*/}
            <Chip
              title="Chamar Ajuda"
              image="https://res.cloudinary.com/dzsoh6zq7/image/upload/v1764462824/bell_fljq4r.png"
              navigateTo="Ajuda"
            />
            <Chip
              title="Perfil"
              image="https://res.cloudinary.com/dzsoh6zq7/image/upload/v1764463228/profile_eecapi.png"
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

      {/* O PedidoAtivoFAB foi removido daqui para não ficar flutuando fixo */}
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
    alignItems: "flex-end", // Mantém alinhado à direita
    marginVertical: 10,
    paddingRight: 10, // Pequeno ajuste para não colar na borda
  },
  // Novo estilo para a linha de ícones (Sino + Sacola)
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});