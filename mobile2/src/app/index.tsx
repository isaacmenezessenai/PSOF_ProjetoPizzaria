// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, Alert 
} from 'react-native';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

// Tipos
type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

type ProductCardProps = {
  product: ProductProps;
  isFavorite?: boolean;
  onFavoritePress: (productId: string) => void;
  onOrderPress: (product: ProductProps) => void;
};

// ProductCard
export const ProductCard = ({
  product,
  isFavorite = false,
  onFavoritePress,
  onOrderPress,
}: ProductCardProps) => (
  <View style={styles.productCard}>
    <Image 
      source={product.image ? { uri: product.image } : require('../assets/img/pizza.png')} 
      style={styles.productImage} 
    />
    <View style={styles.productInfo}>
      <View style={styles.productTitleRow}>
        <View>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>
            {product.description || 'Descrição não disponível'}
          </Text>
          {product.price !== undefined && (
            <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => onFavoritePress(product.id)}>
          <Text>{isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={() => onOrderPress(product)}>
        <Text style={styles.orderButtonText}>Peça Agora</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Dashboard
export default function Dashboard() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Pega categorias
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get('/category'); 
        setCategories(res.data);
        if (res.data.length > 0) setSelectedCategory(res.data[0]);
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar as categorias');
      }
    };
    loadCategories();
  }, []);

  // Pega produtos da categoria selecionada
  useEffect(() => {
    if (!selectedCategory) return;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/category/product', { params: { category_id: selectedCategory.id } });
        const formatted: ProductProps[] = res.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          image: p.banner || undefined,
        }));
        setProducts(formatted);
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar os produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleFavoritePress = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleOrderPress = (product: ProductProps) => {
    Alert.alert(
      'Fazer Pedido',
      `Deseja pedir: ${product.name}${product.price ? ` - R$ ${product.price.toFixed(2)}` : ''}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('🛒 Pedido confirmado:', product) }
      ]
    );
  };

  // Renderiza botão de categoria
  const renderCategoryButton = ({ item }: { item: CategoryProps }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory?.id === item.id && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory?.id === item.id && styles.selectedCategoryButtonText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.menuTitle}>Menu</Text>

      {/* Barra horizontal de categorias */}
      {categories.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={renderCategoryButton}
          style={styles.categoriesList}
        />
      )}

      {/* Produtos */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onFavoritePress={handleFavoritePress}
            onOrderPress={handleOrderPress}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
        </View>
      )}
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6ED' },
  menuTitle: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 12 },

  categoriesList: { paddingHorizontal: 16, marginBottom: 16 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 12, backgroundColor: '#E0E0E0', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  selectedCategoryButton: { backgroundColor: '#9A1105' },
  categoryButtonText: { fontSize: 14, color: '#333', fontWeight: '500' },
  categoryButtonText: { fontSize: 14, color: '#333', fontWeight: '500' },
  selectedCategoryButtonText: { color: '#FFF', fontWeight: 'bold' },

  productCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', marginHorizontal: 16, marginVertical: 8, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  productTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontWeight: 'bold', fontSize: 16 },
  productDescription: { fontSize: 12, color: '#919191' },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#9A1105', marginTop: 4 },
  orderButton: { marginTop: 8, backgroundColor: '#9A1105', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, alignSelf: 'flex-start' },
  orderButtonText: { color: '#fff', fontWeight: 'bold' },
  loadingContainer: { padding: 32, alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666' },
  emptyContainer: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
});
