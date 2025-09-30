

import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";

// ! Components

import Chip from "../components/dashboard/chip";
import Divider from "../components/divider";
import MenuCompleto from "../components/dashboard/MenuCompleto"
import ImageButton from "../components/imageButton";
import Header from "../components/dashboard/header";


export default function Home() {
  return (
    <ScrollView style={{ backgroundColor: "#FAF6ED" }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <ImageButton name="bag-handle-outline" size={55} navigateTo="Sacola" />
        </View>

        <Header />

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
    marginVertical: 10
  }
});