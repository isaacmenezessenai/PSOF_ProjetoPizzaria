import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { Ionicons } from "@expo/vector-icons"; // Importei o ícone

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  banner: string;
  extra: boolean;
}

// Exportamos essa interface para usar no MenuCompleto
export interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  ingredients?: Ingredient[];
  category_id?: string; // Adicionado opcional para compatibilidade
}

type CardProps = {
  data: ProductProps; // Mantivemos 'data'
  onPress?: () => void;
  isFavorite: boolean;          // <--- NOVO
  onToggleFavorite: () => void; // <--- NOVO
};

export default function Card({ data, onPress, isFavorite, onToggleFavorite }: CardProps) {
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
    // Mantive sua lógica de ingredientes original
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

  return (
    <TouchableOpacity 
        style={styles.cardContainer} 
        onPress={handlePress}
        activeOpacity={0.9}
    >
      {/* Botão de Favoritar (Absoluto para ficar flutuando no canto) */}
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={(e) => {
            e.stopPropagation(); // Impede de abrir os detalhes ao clicar na estrela
            onToggleFavorite();
        }}
      >
        <Ionicons 
            name={isFavorite ? "star" : "star-outline"} 
            size={26} 
            color={isFavorite ? "#FFD700" : "#9A1105"} 
        />
      </TouchableOpacity>

      <Image source={{ uri: data.banner }} style={styles.productImage} />

      <View style={styles.infoBox}>
        <View style={styles.headerRow}>
          {/* PaddingRight para o texto não ficar embaixo da estrela */}
          <Text style={[styles.title, { paddingRight: 30 }]} numberOfLines={1}>
            {data.name}
          </Text>
        </View>

        {data.ingredients && data.ingredients.length > 0 ? (
           <Text style={styles.ingredients} numberOfLines={2}>
             {data.ingredients.map(ing => ing.name).join(', ')}
           </Text>
        ) : (
           <Text style={styles.ingredients} numberOfLines={2}>
             {data.description}
           </Text>
        )}

        <Text style={styles.price}>
          {Number(data.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "white", // Corrigido de #FFF para evitar erro se não definido
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    position: 'relative', // Importante para o absolute funcionar
    height: 120, // Altura fixa ajuda no layout
  },
  // Estilo novo da estrela
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 4
  },
  productImage: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  infoBox: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    // fontFamily: "NeueHaas", // Comente se der erro de fonte
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  ingredients: {
    // fontFamily: "NeueHaas",
    fontSize: 13,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // ou a cor de destaque do seu app
  }
});
