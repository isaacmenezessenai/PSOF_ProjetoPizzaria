import React from "react";
import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, StyleSheet,} from "react-native";
import BackButton from "../components/backButton";

type FavoriteItemCardProps = {
  pizzaImage: string;
  starImage: string;
};

const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({
  pizzaImage,
  starImage,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: pizzaImage }}
        resizeMode={"contain"}
        style={styles.pizzaImage}
      />

      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{"Pizza Tal"}</Text>
        <Text style={styles.cardDescription}>{"Descrição"}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Image
          source={{ uri: starImage }}
          resizeMode={"contain"}
          style={styles.starImage}
        />
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => alert("Pressed!")}>
          <Text style={styles.orderButtonText}>{"Peça Agora"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Favoritos: React.FC = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>{"Favoritos"}</Text>
      </View>

      <Image
        source={{
          uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/pe6tkxf0_expires_30_days.png",
        }}
        resizeMode={"stretch"}
        style={styles.wavyLine}
      />

      <View
        style={{
          height: 16,
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <FavoriteItemCard
          pizzaImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/43krd7nf_expires_30_days.png"
          starImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/zdnosars_expires_30_days.png"
        />
        <FavoriteItemCard
          pizzaImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/c2y5363y_expires_30_days.png"
          starImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/x64ygn7m_expires_30_days.png"
        />
        <FavoriteItemCard
          pizzaImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/43krd7nf_expires_30_days.png"
          starImage="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/zdnosars_expires_30_days.png"
        />
      </ScrollView>
    </SafeAreaView>
  );
};


export default Favoritos;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF3E5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 10,
    position: "relative", 
    marginBottom: 13,
    minHeight: 44,
  },
  title: {
    color: "#10191F",
    fontSize: 32, 
    fontWeight: "bold",
  },
  wavyLine: {
    height: 18,
    marginBottom: 13,
    marginHorizontal: 14,
    alignSelf: "stretch",
  },
  cardContainer: {
    flexDirection: "row", 
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 13,
    marginHorizontal: 23,
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pizzaImage: {
    width: 100, 
    height: 100,
    borderRadius: 20, 
  },
  textContainer: {
    flex: 1, 
    marginLeft: 15,
    justifyContent: "center",
  },
  cardTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#666666",
    fontSize: 16,
    marginTop: 4,
  },
  rightColumn: {
    alignItems: "flex-end", 
    justifyContent: "space-between", 
    height: 100,
    paddingVertical: 4, 
  },
  starImage: {
    width: 40, 
    height: 40,
  },
  orderButton: {
    backgroundColor: "#9A1105",
    borderRadius: 41,
    paddingVertical: 12,
    paddingHorizontal: 28, 
  },
  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});