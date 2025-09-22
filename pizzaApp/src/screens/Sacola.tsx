import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Certifique-se de ter @expo/vector-icons instalado

// Dados mockados para simular a lista de pizzas
const pizzaItems = [
  { id: '1', name: 'Pizza Tal', description: 'Molho de tomate, Queijo...', extra: 'Adicional Queijo 1x', quantity: 1, image: require('./assets/pizza1.png') },
  { id: '2', name: 'Pizza Tal', description: 'Molho de tomate, Queijo...', extra: 'Adicional Queijo 1x', quantity: 1, image: require('./assets/pizza1.png') },
  { id: '3', name: 'Pizza Tal', description: 'Molho de tomate, Queijo...', extra: 'Adicional Queijo 1x', quantity: 1, image: require('./assets/pizza1.png') },
  { id: '4', name: 'Pizza Tal', description: 'Molho de tomate, Queijo...', extra: 'Adicional Queijo 1x', quantity: 1, image: require('./assets/pizza1.png') },
];

// Componente para um item da pizza
const CartItem = ({ item }: { item: any }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemExtra}>{item.extra}</Text>
      <TouchableOpacity style={styles.editButtonContainer}>
        <Text style={styles.editButton}>Editar</Text>
        <AntDesign name="arrow-right" size={12} color="orange" style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </View>
    <View style={styles.quantityControl}>
      <TouchableOpacity>
        <Text style={styles.quantityButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <TouchableOpacity>
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Componente principal da tela
const CartScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Sacola</Text>
        </View>
      </View>
      
      {/* Onda decorativa */}
      <Image source={require('./assets/wave.png')} style={styles.wave} />

      {/* Lista de itens */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pizzaItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Resumo */}
      <View style={styles.summaryContainer}>
        <Image source={require('./assets/wave.png')} style={styles.waveAboveSummaryTitle} />
        <Text style={styles.summaryTitle}>Resumo</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>R$ 13.23</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.summaryTotalLabel]}>Total</Text>
          <Text style={[styles.summaryValue, styles.summaryTotalValue]}>R$ 13.23</Text>
        </View>
      </View>

      {/* Botão de pagamento */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar Agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Cor de fundo branca
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wave: {
    width: '100%',
    height: 10,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  waveAboveSummaryTitle: {
    width: '100%',
    height: 10,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#888',
  },
  itemExtra: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  editButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  editButton: {
    color: 'orange',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  quantityButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  summaryContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryTotalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    fontSize: 18,
  },
  payButton: {
    backgroundColor: '#E59B30',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;

