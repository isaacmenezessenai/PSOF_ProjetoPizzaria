import React from "react";
import { View, StyleSheet } from "react-native";
import Chip from "../components/dashboard/chip";
import Card from "../components/card"
import Divider from "../components/divider";
import CategoryNav from "../components/dashboard/categoryList"

export default function Home() {
  return (
    <View style={styles.container}>

      <Divider />

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

      <CategoryNav />

      <Card
  title="Pizza Tal"
  description="Descrição da pizza"
  image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
  favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
  onPress={() => alert("Pressed!")}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6ED",
    justifyContent: "center",
    
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
});
