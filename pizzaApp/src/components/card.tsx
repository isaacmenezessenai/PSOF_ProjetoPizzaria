import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type CardProps = {
  title: string;
  description: string;
  image: string;
  favoriteIcon?: string;
  onPress: () => void;
};

export default function Card({ title, description, image, favoriteIcon, onPress }: CardProps) {
  return (
    <View style={styles.cardContainer}>

      <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />

      <View style={styles.infoBox}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          {favoriteIcon && (
            <Image source={{ uri: favoriteIcon }} style={styles.favoriteIcon} resizeMode="contain" />
          )}
        </View>

        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText} >Peça Agora 
          
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderRadius: 20,
    borderWidth: 1,
    paddingRight: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginRight: 10,
    margin: 5
  },
  infoBox: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    fontFamily: "NeueHaas",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontFamily: "NeueHaas",
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  favoriteIcon: {
    width: 25,
    height: 25,
  },
  button: {
    backgroundColor: "#9A1105",
    marginTop: 10,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontFamily: "NeueHaas",
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
