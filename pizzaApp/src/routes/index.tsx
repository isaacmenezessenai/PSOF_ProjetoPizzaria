import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favoritos from "../screens/Favoritos";
import Pedidos from "../screens/Pedidos";
import Ajuda from "../screens/Ajuda";
import Perfil from "../screens/Perfil";
import Sacola from "../screens/Sacola";
import Detalhes from "../screens/DetalhesProduto";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="Ajuda" component={Ajuda} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Sacola" component={Sacola} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
