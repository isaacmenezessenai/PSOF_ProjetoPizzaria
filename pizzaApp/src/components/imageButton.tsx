import React from "react";
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";

type ImageButtonProps = {
  image: ImageSourcePropType; 
  size?: number; 
  navigateTo: string; 
};

export default function ImageButton({ image, size = 50, navigateTo }: ImageButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size, borderRadius: size / 2 }]}
      onPress={() => navigation.navigate(navigateTo as never)}
    >
      <Image
        source={image}
        style={{ width: size * 0.6, height: size * 0.6, resizeMode: "contain" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
