import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  banner: string;
  extra: boolean;
}

export interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  ingredients?: Ingredient[];
}

type CardProps = {
  data: ProductProps;
  onPress?: () => void;
};

export default function Card({ data, onPress }: CardProps) {
  const navigation: any = useNavigation();
  const [nonExtraIngredients, setNonExtraIngredients] = useState<Ingredient[]>([]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Detalhes", { product: data });
    }
  };

  useEffect(() => {
    async function fetchNonExtraIngredients() {
      try {
        const response = await api.get('/ingredients');
        setNonExtraIngredients(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes não extras:', error);
      }
    }
    fetchNonExtraIngredients();
  }, []);

  let formattedPrice = "R$ --,--";

  if (data.price) {
    const priceAsNumber = parseFloat(data.price.replace(",", "."));

    if (!isNaN(priceAsNumber)) {
      formattedPrice = priceAsNumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: data.banner }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.infoBox}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{data.name}</Text>
        </View>

        {nonExtraIngredients.length > 0 ? (
          <Text style={styles.ingredients} numberOfLines={2}>
            {nonExtraIngredients.map((ing) => ing.name).join(", ")}
          </Text>
        ) : (
          <Text style={styles.ingredientsEmpty}>Sem ingredientes</Text>
        )}

        <View style={styles.footerRow}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Peça Agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 140,
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  infoBox: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "NeueHaas",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  ingredients: {
    fontFamily: "NeueHaas",
    fontSize: 13,
    color: "#666",
    marginVertical: 6,
  },
  ingredientsEmpty: {
    fontFamily: "NeueHaas",
    fontSize: 13,
    color: "#aaa",
    marginVertical: 6,
    fontStyle: "italic",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontFamily: "NeueHaas",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#9A1105",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontFamily: "NeueHaas",
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});
