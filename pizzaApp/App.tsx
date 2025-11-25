import React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { TableProvider } from "./src/contexts/TableContext";
import { CartProvider } from "./src/contexts/CartContext";
import { AuthProvider } from "./src/contexts/AuthContext";

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
    <AuthProvider>
      <TableProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </TableProvider>
    </AuthProvider>
  );
}
