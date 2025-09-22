import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <Image
      source={{
        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/18s7rzpn_expires_30_days.png",
      }}
      resizeMode="contain"
      style={styles.divisoria}
    />
  );
}

const styles = StyleSheet.create({
  divisoria: {
    height: 30,
    marginBottom: 15,
  },
});
