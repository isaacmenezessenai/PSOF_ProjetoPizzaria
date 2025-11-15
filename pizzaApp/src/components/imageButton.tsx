import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

type ImageButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  size: number; 
  navigateTo: string;
};

export default function ImageButton({ name, size, navigateTo }: ImageButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
      onPress={() => navigation.navigate(navigateTo as never)}
    >
      <Ionicons name={name} size={size * 0.6}></Ionicons>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
