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

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  const itemInCart = typeof index === "number" && items[index] ? items[index] : undefined;

  const [quantity, setQuantity] = useState(itemInCart?.quantity || 1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>(
    itemInCart?.extras || []
  );
  // initialize removedIngredients when editing an existing cart item
  useEffect(() => {
    if (itemInCart?.removedIngredients && Array.isArray(itemInCart.removedIngredients)) {
      setRemovedIngredients(itemInCart.removedIngredients.map(String));
    }
  }, [itemInCart]);
  

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoadingIngredients(true);
        // backend expects product_id as a query parameter
        const response = await api.get('/ingredients/product', { params: { product_id: product.id } });
        console.log('GET /ingredients/product response:', response.data);

        // Normalize result into an array of items.
        let items: any[] = [];
        if (Array.isArray(response.data)) {
          items = response.data;
        } else if (response.data) {
          items = response.data.ingredients || response.data.data || response.data.items || [];
          if (!items.length && (response.data.id || response.data.name)) {
            items = [response.data];
          }
        }

        // If no items found, try fallback global endpoint
        if (!items || items.length === 0) {
          try {
            const fb = await api.get('/ingredients');
            console.log('Fallback GET /ingredients response:', fb.data);
            items = Array.isArray(fb.data) ? fb.data : fb.data?.ingredients || fb.data?.data || [];
          } catch (fbErr) {
            console.warn('Fallback ingredients fetch failed', fbErr);
            items = [];
          }
        }

        setIngredients(items || []);
      } catch (err) {
        console.warn('Error fetching product ingredients:', err);
        setIngredients([]);
      } finally {
        setLoadingIngredients(false);
      }
    }
    fetchIngredients();
  }, [product.id]);

  const total = useMemo(() => {
    const extrasPrice = selectedExtras.reduce((sum, extra) => {
      const price = parseFloat(extra.price) || 0;
      return sum + price;
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
    
    // Cria o objeto do novo item com os extras e ingredientes removidos
    const newItem = { product, quantity, extras: selectedExtras, removedIngredients };
    console.log('Adding to cart:', { productId: product.id, quantity, extras: selectedExtras, removedIngredients });

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
            <Text style={styles.description}>{product.description}</Text>
            {loadingIngredients ? (
              <ActivityIndicator size="small" color="#BCA85C" style={{ marginVertical: 4 }} />
            ) : ingredients.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Ingredientes</Text>
                {ingredients.map((pi) => {
                  const rawId = pi.id ?? pi.ingredient?.id ?? pi._id ?? pi.productIngredient_id ?? pi.productIngredientId;
                  const prodIngId = String(rawId ?? '');
                  const ing = pi.ingredient || pi;
                  // selected by default (not removed)
                  const isSelected = !removedIngredients.includes(prodIngId);
                  return (
                    <View key={prodIngId} style={styles.extraItemContainer}>
                      <View>
                        <Text style={styles.extraName}>{ing.name}</Text>
                        {ing.price ? (
                          <Text style={styles.extraPrice}>+ R$ {parseFloat(String(ing.price)).toFixed(2)}</Text>
                        ) : null}
                      </View>
                        <TouchableOpacity
                        style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                        onPress={() => {
                          // toggle: if currently selected, mark as removed; otherwise un-remove
                              if (isSelected) {
                                setRemovedIngredients((prev) => [...prev, prodIngId]);
                              } else {
                                setRemovedIngredients((prev) => prev.filter((p) => p !== prodIngId));
                              }
                        }}
                      >
                        <Text style={[styles.checkboxText, isSelected && styles.checkboxTextSelected]}>{isSelected ? '✓' : ''}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </>
            ) : null}

            {/* --- 6. RENDERIZAÇÃO DO COMPONENTE DE ADICIONAIS --- */}
            <ExtraIngredientsSelector
              api={api}
              onChange={setSelectedExtras}
              initialExtras={selectedExtras}
              categoryId={(product as any).category_id || (product as any).category?.id || (product as any).categoryId}
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

    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
      textAlign: 'center',
      width: '100%',
      fontFamily: 'NeueHaas'
    },
    extraItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      width: '100%',
    },
    extraName: {
      fontSize: 16,
      color: '#444',
    },
    extraPrice: {
      fontSize: 14,
      color: '#888',
    },
    checkbox: {
      width: 36,
      height: 36,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    checkboxSelected: {
      backgroundColor: '#9A1105',
      borderColor: '#9A1105',
    },
    checkboxText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    checkboxTextSelected: {
      color: '#fff',
    },

  });
