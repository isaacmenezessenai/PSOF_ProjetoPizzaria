import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favoritos from "../screens/favoritos";
import Pedidos from "../screens/pedidos";
import Ajuda from "../screens/ajuda";
import Perfil from "../screens/perfil";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
