import React, { useState, useCallback } from "react";
import { 
  SafeAreaView, View, FlatList, Image, Text, 
  TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl 
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/backButton";
import { api } from "../services/api"; // Certifique-se que o caminho está correto

// Tipo para o item que vem da API de Favoritos
// O backend retorna um objeto que contém o relacionamento "product"
type FavoriteItem = {
  id: string; // ID da tabela de Favoritos (usado para remover)
  product: {
    id: string;
    name: string;
    description: string;
    banner: string;
    price: string;
  }
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega os favoritos da API
  async function loadFavorites() {
    setLoading(true);
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.log("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Recarrega a lista toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Remove o favorito
  async function handleRemoveFavorite(favoriteId: string) {
    try {
      // Atualiza a UI imediatamente (Optimistic Update)
      setFavorites((oldList) => oldList.filter((item) => item.id !== favoriteId));

      // Chama a API para deletar
      // Nota: Seu backend espera { favorites_id: ... } no corpo da requisição DELETE
      await api.delete('/favorite', { 
        data: { favorites_id: favoriteId } 
      });

    } catch (error) {
      console.log("Erro ao remover favorito:", error);
      // Se der erro, recarrega a lista original
      loadFavorites();
    }
  }

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: item.product.banner }}
        resizeMode={"cover"}
        style={styles.pizzaImage}
      />

      <View style={styles.textContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.product.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={1}>{item.product.description}</Text>
      </View>

      <View style={styles.rightColumn}>
        {/* Ao clicar na estrela na tela de favoritos, remove o item */}
        <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
             <Ionicons name="star" size={30} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => console.log("Navegar para detalhes:", item.product.id)}>
          <Text style={styles.orderButtonText}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Meus Favoritos</Text>
      </View>

      {/* Linha ondulada decorativa - mantida do seu design original */}
      <Image
        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/OWXwBblV3x/pe6tkxf0_expires_30_days.png" }}
        resizeMode={"stretch"}
        style={styles.wavyLine}
      />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#9A1105" />
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Você ainda não possui favoritos.</Text>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadFavorites} colors={["#9A1105"]} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: {
    color: "#10191F",
    fontSize: 28, 
    fontWeight: "bold",
    marginLeft: 10,
  },
  wavyLine: {
    height: 18,
    marginBottom: 20,
    marginHorizontal: 14,
    alignSelf: "stretch",
  },
  cardContainer: {
    flexDirection: "row", 
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 20,
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pizzaImage: {
    width: 80, 
    height: 80,
    borderRadius: 15, 
  },
  textContainer: {
    flex: 1, 
    marginLeft: 12,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
  },
  rightColumn: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingVertical: 5
  },
  orderButton: {
    backgroundColor: "#9A1105",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  orderButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12
  },
  emptyText: {
    textAlign: 'center', 
    color: '#888', 
    marginTop: 40, 
    fontSize: 16 
  }
});