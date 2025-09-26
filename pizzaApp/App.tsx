import React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { TableProvider } from "./src/contexts/TableContext";
import { CartProvider } from "./src/contexts/CartContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    "NeueHaas": require("./assets/fonts/Neue Haas Grotesk Display Pro.ttf"),
    "FactorA": require("./assets/fonts/TRIAL Factor A.otf"),
    "Chunko": require("./assets/fonts/Chunko Bold Demo.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TableProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </TableProvider>
  );
}
