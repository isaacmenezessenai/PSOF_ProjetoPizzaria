import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import Favoritos from "../screens/Favoritos";
import Pedidos from "../screens/Pedidos";
import Ajuda from "../screens/Ajuda";
import Perfil from "../screens/Perfil";
import Sacola from "../screens/Sacola";
import Detalhes from "../screens/DetalhesProduto";
import QRCode from "../screens/QRCode";
import Checkout from "../screens/Checkout";
import StatusPedido from "../screens/StatusPedido";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="Ajuda" component={Ajuda} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Sacola" component={Sacola} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="StatusPedido" component={StatusPedido} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
