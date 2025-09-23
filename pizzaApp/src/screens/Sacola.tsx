import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes";


type SacolaNavigationProp = NativeStackNavigationProp<RootStackParamList, "Sacola">;


const divisorImage = require("../../assets/img/divider.png"); 
const pizzaImage = require("../../assets/img/pizza.png");

export default function Sacola() {
  const navigation = useNavigation<SacolaNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Sacola</Text>
        </View>
      </View>
      <Image source={divisorImage} style={styles.divisorImage} />
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.cartItem}>
          <Image source={pizzaImage} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Pizza Calabresa</Text>
            <Text style={styles.itemDescription}>Molho de tomate, queijo, calabresa</Text>
            <TouchableOpacity>
              <Text style={styles.itemEdit}>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cartItem}>
          <Image source={pizzaImage} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Pizza Calabresa</Text>
            <Text style={styles.itemDescription}>Molho de tomate, queijo, calabresa</Text>
            <TouchableOpacity>
              <Text style={styles.itemEdit}>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cartItem}>
          <Image source={pizzaImage} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Pizza Calabresa</Text>
            <Text style={styles.itemDescription}>Molho de tomate, queijo, calabresa</Text>
            <TouchableOpacity>
              <Text style={styles.itemEdit}>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <View style={styles.summaryContainer}>
        <Image source={divisorImage} style={styles.divisorImage} />
        <Text style={styles.summaryTitle}>Resumo</Text>
        <View style={styles.summaryDetails}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryValue}>R$40,00</Text>
        </View>
        <View style={styles.summaryDetails}>
          <Text style={[styles.summaryText, styles.totalText]}>Total</Text>
          <Text style={[styles.summaryValue, styles.totalValue]}>R$40,00</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar Agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", 
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold", 
  },
  divisorImage: {
    width: "100%",
    height: 10, 
    resizeMode: "stretch",
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Roboto_400Regular",
    marginTop: 5,
  },
  itemEdit: {
    fontSize: 14,
    color: "#A0A0A0",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#E0E0E0",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#000",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
  },
  summaryContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  summaryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  summaryText: {
    fontSize: 16,
    color: "#555",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  payButton: {
    backgroundColor: "#E59B30",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: "center",
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});