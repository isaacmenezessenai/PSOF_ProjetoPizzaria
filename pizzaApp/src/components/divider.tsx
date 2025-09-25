import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <Image
      source={require("../../assets/img/divider.png")}
      resizeMode="contain"
      style={styles.divisoria}
    />
  );
}

const styles = StyleSheet.create({
  divisoria: {
    height: 30,
    marginBottom: 15,
    alignSelf: "center",
  },
});
