import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ProductCardProps } from '../../types';
import { styles } from './styles';

export const ProductCard = ({
  product,
  isFavorite = false,
  onFavoritePress,
  onOrderPress,
}: ProductCardProps) => (
  <View style={styles.productCard}>
    <Image 
      source={
        product.image 
          ? { uri: product.image } 
          : require('../../../assets/placeholder.png')
      } 
      style={styles.productImage} 
    />
    <View style={styles.productInfo}>
      <View style={styles.productTitleRow}>
        <View style={styles.productTextContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          {product.description && (
            <Text style={styles.productDescription}>{product.description}</Text>
          )}
          {product.price && (
            <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => onFavoritePress(product.id)}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.orderButton} 
        onPress={() => onOrderPress(product)}
      >
        <Text style={styles.orderButtonText}>Peça Agora</Text>
      </TouchableOpacity>
    </View>
  </View>
);