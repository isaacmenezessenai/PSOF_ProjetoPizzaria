import React from "react";
import { View, Text } from "react-native";
import BackButton from "../components/backButton";

export default function Sacola() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BackButton />
      <Text>Página Sacola</Text>
    </View>
  );
}
