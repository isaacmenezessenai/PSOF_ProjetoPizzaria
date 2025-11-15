import React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { TableProvider } from "./src/contexts/TableContext";
import { CartProvider } from "./src/contexts/CartContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    "NeueHaas": require("./assets/fonts/NeueHaasGroteskDisplayPro.ttf"),
    "FactorA": require("./assets/fonts/FactorA.otf"),
    "Chunko": require("./assets/fonts/ChunkoBoldDemo.ttf"),
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
