import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/tabBar";
import Favoritos from "../screens/Favoritos";
import Ajuda from "../screens/Ajuda";
import Perfil from "../screens/Perfil";
import Home from "../screens/Home";
import QRCode from "../screens/QRCodeScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Favoritos" component={Favoritos} />
  <Tab.Screen name="QrCode" component={QRCode} />
  <Tab.Screen name="Ajuda" component={Ajuda} />
  <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
