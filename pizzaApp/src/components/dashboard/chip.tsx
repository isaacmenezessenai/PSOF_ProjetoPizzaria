import React from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type ChipProps = {
  title: string;
  image: string;
  navigateTo: string;
};

export default function Chip({ title, image, navigateTo }: ChipProps) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const CHIP_WIDTH = (width - 60) / 4;

  return (
    <TouchableOpacity
      style={[styles.chip, { width: CHIP_WIDTH }]}
      onPress={() => navigation.navigate(navigateTo as never)}
    >
      <Image source={{ uri: image }} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 130,
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});
