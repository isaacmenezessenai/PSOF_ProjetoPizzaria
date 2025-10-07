import React from "react";
import { View, Text } from "react-native";
import BackButton from "../components/backButton";

export default function Favoritos() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BackButton />
      <Text>Página Favoritos</Text>
    </View>
  );
}

