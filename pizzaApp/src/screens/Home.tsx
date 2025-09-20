import React from "react";
import { View, StyleSheet } from "react-native";
import Chip from "../components/chip";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6ED",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
});
