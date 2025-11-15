import React, { useEffect, useMemo, useState } from "react";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductProps, Ingredient } from "../components/dashboard/card";
import { useTable } from "../contexts/TableContext";
import { useCart } from "../contexts/CartContext";
import Divider from "../components/divider";
import { api } from "../services/api";
import BackButton from "../components/backButton";
import { ExtraIngredientsSelector, SelectedExtra } from "../components/ingredientCard";

type RootStackParamList = {
  QRCode: undefined;
  Sacola: undefined;
  Detalhes: { product: ProductProps; index?: number };
};

type DetalhesProdutoScreenProp = StackNavigationProp<
  RootStackParamList,
  "Detalhes"
>;

export default function DetalhesProduto() {
  const route = useRoute();
  const navigation = useNavigation<DetalhesProdutoScreenProp>();
  const { tableNumber } = useTable();
  const { setItems, items, setPendingProduct } = useCart();
  const { product, index } = route.params as { product: ProductProps; index?: number };

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  const itemInCart = typeof index === "number" && items[index] ? items[index] : undefined;

  const [quantity, setQuantity] = useState(itemInCart?.quantity || 1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>(
    itemInCart?.extras || []
  );
  

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoadingIngredients(true);
        const response = await api.get('/ingredients/non-extra');
        setIngredients(response.data);
      } catch (err) {
        setIngredients([]);
      } finally {
        setLoadingIngredients(false);
      }
    }
    fetchIngredients();
  }, []);

  const total = useMemo(() => {
    const extrasPrice = selectedExtras.reduce((sum, extra) => {
      const price = parseFloat(extra.price) || 0;
      return sum + price * extra.amount;
    }, 0);

    const productPrice = parseFloat(product.price.replace(",", ".")) || 0;
    
    const singleItemTotal = productPrice + extrasPrice;

    return singleItemTotal * quantity;
  }, [quantity, selectedExtras, product.price]);


  // --- 5. FUNÇÃO handleAddToCart ATUALIZADA ---
  function handleAddToCart() {
    if (!tableNumber) {
      // Inclui os 'extras' ao redirecionar para o QRCode
      setPendingProduct({ product, quantity, extras: selectedExtras });
      navigation.navigate("QRCode");
      return;
    }
    
    // Cria o objeto do novo item com os extras
    const newItem = { product, quantity, extras: selectedExtras };

    if (typeof index === "number" && items[index]) {
      // Se está editando, substitui o item na posição 'index'
      const newItems = [...items];
      newItems[index] = newItem;
      setItems(newItems);
    } else {
      const itemIndex = items.findIndex(i => i.product.id === product.id);

      if (itemIndex !== -1) {
        const newItems = [...items];
        newItems[itemIndex] = newItem;
        setItems(newItems);
      } else {
        setItems([...items, newItem]);
      }
    }

      navigation.navigate("Sacola");
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#FAF6ED" }}>
        <ScrollView>
          <View style={styles.container}>
            <BackButton style={{ marginTop: 20, alignSelf: "flex-start" }} />
            <Image source={{ uri: product.banner }} style={styles.image} />
            <Divider />
            <Text style={styles.title}>{product.name}</Text>
            {loadingIngredients ? (
              <ActivityIndicator size="small" color="#BCA85C" style={{ marginVertical: 4 }} />
            ) : ingredients.length > 0 ? (
              <Text style={styles.ingredients} numberOfLines={2}>
                {ingredients.map((ing) => ing.name).join(", ")}
              </Text>
            ) : null}
            <Text style={styles.description}>{product.description}</Text>

            {/* --- 6. RENDERIZAÇÃO DO COMPONENTE DE ADICIONAIS --- */}
            <ExtraIngredientsSelector
              api={api}
              onChange={setSelectedExtras} 
              initialExtras={selectedExtras} 
            />
          </View>
        </ScrollView>
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
          <View style={styles.actionBar}>
            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>
                {typeof index === "number" ? "Atualizar" : "Adicionar"}
              </Text>
              <Text style={styles.totalText}>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center",
    },
    image: {
      width: 180,
      height: 180,
      resizeMode: "contain",
      marginTop: 8,
      marginBottom: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginTop: 8,
      marginBottom: 2,
      color: "#222",
      textAlign: "center",
      fontFamily: "Neue Haas",
    },
    ingredients: {
      fontSize: 15,
      color: "#BCA85C",
      textAlign: "center",
      marginBottom: 2,
      fontFamily: "Neue Haas",
    },
    description: {
      fontSize: 16,
      color: "#444",
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "Neue Haas",
    },
    actionBar: {
      flexDirection: "row",
      alignSelf: "center",
      marginHorizontal: 12,
      gap: 10,
      paddingVertical: 12,
      backgroundColor: "#fff",
    },
    qtyBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#000",
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    qtyButton: {
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    qtyButtonText: {
      color: "#fff",
      fontSize: 22,
    },
    qtyText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 8,
    },
    addButton: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: "#9A1105",
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingVertical: 10,
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    totalText: {
      color: "#ffffffff",
      fontSize: 16,
      fontWeight: "bold",
    },

  });
