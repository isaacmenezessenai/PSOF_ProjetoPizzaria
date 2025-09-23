// import React from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";


// export interface ProductProps {
//   id: string
//   name: string
//   price: string
//   description: string
//   banner: string
// }


// type CardProps = {
//   data: ProductProps
//   onPress?: () => void
// };

// export default function Card({ data, onPress }: CardProps) {
//   const navigation: any = useNavigation();

//   const handlePress = () => {
//     if (onPress) {
//       onPress()
//     } else {
//       navigation.navigate('Detalhes', { productId: data.id })
//     }
//   };

//   let formattedPrice = 'R$ --,--'

//   if (data.price) {
//     const priceAsNumber = parseFloat(data.price.replace(',', '.'))

//     if (!isNaN(priceAsNumber)) {
//       formattedPrice = priceAsNumber.toLocaleString('pt-BR', {
//         style: 'currency',
//         currency: 'BRL',
//       })
//     }
//   }

//   return (
//     <View style={styles.cardContainer}>
//       <Image source={{ uri: data.banner }} style={styles.productImage} resizeMode="cover" />
//       <View style={styles.infoBox}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>{data.name}</Text>
//         </View>

//         <Text style={styles.description} numberOfLines={2}>{data.description}</Text>

//         <View style={styles.footerRow}>
//           <Text style={styles.price}>{formattedPrice}</Text>
//           <TouchableOpacity style={styles.button} onPress={handlePress}>
//             <Text style={styles.buttonText}>Peça Agora</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   cardContainer: {
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     marginHorizontal: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   productImage: {
//     width: 140,
//     height: '100%',
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//   },
//   infoBox: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'space-between',
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   title: {
//     fontFamily: "NeueHaas",
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   description: {
//     fontFamily: "NeueHaas",
//     fontSize: 14,
//     color: "#666",
//     marginVertical: 8,
//   },
//   footerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   price: {
//     fontFamily: "NeueHaas",
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   button: {
//     backgroundColor: "#9A1105",
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   buttonText: {
//     fontFamily: "NeueHaas",
//     color: "#FFF",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });

import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

// Passo 1: Defina a interface CardProps
// Isso informa ao TypeScript quais props o componente Card aceita.
export interface CardProps {
  title: string;
  description: string;
  image: string;
  favoriteIcon: string;
}

// Passo 2: Use a interface no componente
// A desestruturação ({ title, description, ... }) tipada com : CardProps
// garante que as propriedades esperadas serão recebidas.
export default function Card({ title, description, image, favoriteIcon }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Image
          source={{ uri: favoriteIcon }}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F7F2E8",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#888",
    width: 150,
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteIcon: {
    width: 25,
    height: 25,
  },
});