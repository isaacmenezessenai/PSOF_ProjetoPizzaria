import React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "NeueHaas": require("./assets/fonts/Neue Haas Grotesk Display Pro.ttf"),
    "FactorA": require("./assets/fonts/TRIAL Factor A 35.otf"),
    "Chunko": require("./assets/fonts/Chunko Bold Demo.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}
