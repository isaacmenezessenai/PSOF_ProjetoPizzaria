import React from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import Chip from "../components/dashboard/chip";

import Divider from "../components/divider";
import ImageButton from "../components/imageButton";
import { Dimensions } from "react-native";
import MenuCompleto from "../components/dashboard/MenuCompleto"
const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
  return (
    <ScrollView style={{ backgroundColor: "#FAF6ED" }}>
      <View style={styles.container}>

        <View style={{ alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
          <ImageButton
            image={require("../../assets/img/sacola.png")}
            size={50}
            navigateTo="Sacola"
          />
        </View>

        <View style={{ alignItems: "flex-start" }}>
          <Image
            source={require("../../assets/img/header.png")}
            style={{
              width: screenWidth * 0.8,
              resizeMode: "contain",
              marginLeft: 20,
              marginBottom: -120,
              marginTop: -120,
            }}
          />
        </View>

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
            navigateTo="Detalhes"
          />
        </View>

        <Divider />

        <View style={{ marginHorizontal: 20, marginBottom: 30, alignItems: 'center', }}>
          <Image source={require('../../assets/img/menu.png')} style={{ width: 150, height: 50, resizeMode: 'contain' }} />
        </View>

        <MenuCompleto />
        
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
});