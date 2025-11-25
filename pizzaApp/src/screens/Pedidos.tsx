import React from "react";
import { View, Text } from "react-native";
import BackButton from "../components/backButton";
import ProtectedScreen from "../components/ProtectedScreen";

export default function Pedidos() {
  const content = (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BackButton />
      <Text>Página Pedidos</Text>
    </View>
  );

  return <ProtectedScreen featureName="Histórico de Pedidos">{content}</ProtectedScreen>;
}
