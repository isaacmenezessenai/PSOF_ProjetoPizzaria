import React, { useState } from "react";
import {  View,  ScrollView,  Image,  Text,  TextInput,  TouchableOpacity,  StyleSheet,} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface ProductDetailsProps {}

export default function Detalhes(props: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/275tzlgg_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.headerImage}
          />

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/dhmfv4db_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.mainImage}
          />

          <View style={styles.pizzaInfoContainer}>
            <Text style={styles.pizzaTitle}>Pizza Tal</Text>
            <Text style={styles.pizzaDescription}>
              Molho de tomate, Queijo, Pepperoni
            </Text>
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/4gxzxd1i_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.ratingImage}
          />

          <View style={styles.iconRowContainer}>
            <View style={styles.iconRow}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/cz1kvp8g_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.iconLeft}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/fgssjiv8_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.iconMiddle}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/i34wse1u_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.iconRight}
              />
            </View>
          </View>

          <View style={styles.additionalContainer}>
            <Text style={styles.sectionTitle}>Adicional</Text>
            <View style={styles.additionalItem}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/a26l0ls2_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.additionalImage}
              />
              <View style={styles.additionalInfo}>
                <View>
                  <Text style={styles.additionalName}>Queijo</Text>
                  <Text style={styles.additionalPrice}>R$ 1.67</Text>
                </View>

                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={handleDecrement}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity onPress={handleIncrement}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.observationsContainer}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder=""
            />
          </View>

          <View style={styles.bottomBar}>
            <View style={styles.quantityButton}>
              <TouchableOpacity onPress={handleDecrement}>
                <Text style={styles.bottomBarButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.bottomBarQuantityText}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrement}>
                <Text style={styles.bottomBarButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar</Text>
              <Text style={styles.addButtonPrice}>R$ 26,90</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scrollView: {
      flex: 1,
      backgroundColor: "#FAF6ED",
    },
    headerImage: {
      height: 44,
      marginTop: 28,
      marginBottom: 12,
      marginHorizontal: 22,
    },
    mainImage: {
      height: 209,
      marginBottom: 12,
      marginHorizontal: 1,
    },
    pizzaInfoContainer: {
      paddingHorizontal: 50,
      marginBottom: 12,
      marginHorizontal: 30,
    },
    pizzaTitle: {
      color: "#10191F",
      fontSize: 40,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
    pizzaDescription: {
      color: "#828282",
      fontSize: 12,
      fontWeight: "bold",
      alignItems: "center",
    },
    ratingImage: {
      height: 18,
      marginBottom: 12,
      marginHorizontal: 22,
    },
    iconRowContainer: {
      alignItems: "center",
      marginBottom: 12,
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      paddingHorizontal: 19,
    },
    iconLeft: {
      width: 24,
      height: 25,
      marginRight: 46,
    },
    iconMiddle: {
      width: 32,
      height: 33,
      marginRight: 46,
    },
    iconRight: {
      width: 39,
      height: 39,
    },
    additionalContainer: {
      marginBottom: 12,
      marginHorizontal: 27,
    },
    sectionTitle: {
      color: "#10191F",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      marginLeft: 10,
    },
    additionalItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderColor: "#E6E6E6",
      borderRadius: 25,
      borderWidth: 1,
      marginBottom: 10,
      marginHorizontal: 10,
      paddingRight: 15,
    },
    additionalImage: {
      borderRadius: 25,
      width: 89,
      height: 79,
      marginRight: 15,
    },
    additionalInfo: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    additionalName: {
      color: "#10191F",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 6,
    },
    additionalPrice: {
      color: "#10191F",
      fontSize: 20,
      fontWeight: "bold",
    },
    quantityControl: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 3,
    },
    quantityButtonText: {
      color: "#000000",
      fontSize: 32,
      fontWeight: "bold",
      marginHorizontal: 10,
    },
    quantityText: {
      color: "#000000",
      fontSize: 32,
      fontWeight: "bold",
      marginHorizontal: 13,
    },
    observationsContainer: {
      marginBottom: 12,
      marginHorizontal: 27,
    },
    textInput: {
      height: 100,
      borderColor: "#E6E6E6",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#FFFFFF",
      textAlignVertical: "top",
      marginHorizontal: 10,
    },
    bottomBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderColor: "#E6E6E6",
      marginTop: 20,
    
    },
    quantityButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#000000",
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    bottomBarButtonText: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
      marginHorizontal: 15,
    },
    bottomBarQuantityText: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
    },
    addButton: {
      backgroundColor: "#CC0000",
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 25,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 150,
    },
    addButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
   addButtonPrice: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
    },
  });