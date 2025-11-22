import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import EsqueceuSenha from "../screens/EsqueceuSenha";
import PedirAjuda from "../screens/PedirAjuda";
import Favoritos from "../screens/Favoritos";
import Pedidos from "../screens/Pedidos";
import Ajuda from "../screens/Ajuda";
import Perfil from "../screens/Perfil";
import Sacola from "../screens/Sacola";
import Detalhes from "../screens/DetalhesProduto";
import QRCode from "../screens/QRCode";
import StatusPedido from "../screens/StatusPedido";
import Checkout from "../screens/Checkout";
import { TableProvider } from "../contexts/TableContext"
import { RootStackParamList } from "./RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <TableProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {/* Telas de autenticação */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
          <Stack.Screen name="PedirAjuda" component={PedirAjuda} />

          {/* Tela principal */}
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
    </TableProvider>
  );
}
