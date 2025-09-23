// import React from "react";
// import { ScrollView, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import type { RootStackParamList } from "../routes";
// import Chip from "../components/dashboard/chip";
// import Card from "../components/card";
// import Divider from "../components/divider";

// const screenWidth = Dimensions.get("window").width;

// // tipagem da navegação
// type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// export default function Home() {
//   const navigation = useNavigation<HomeNavigationProp>();

//   return (
//     <ScrollView style={{ backgroundColor: "#FAF6ED" }}>
//       <View style={styles.container}>
//         {/* Botão Sacola */}
//         <View style={{ alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
//           <TouchableOpacity onPress={() => navigation.navigate("Sacola")}>
//             <Image
//               source={require("../../assets/img/sacola.png")}
//               style={{ width: 50, height: 50 }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Header */}
//         <View style={{ alignItems: "flex-start" }}>
//           <Image
//             source={require("../../assets/img/header.png")}
//             style={{
//               width: screenWidth * 0.8,
//               resizeMode: "contain",
//               marginLeft: 20,
//               marginBottom: -120,
//               marginTop: -120,
//             }}
//           />
//         </View>

//         <Divider />

//         {/* Chips */}
//         <View style={styles.list}>
//           <Chip title="Favoritos" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/o13ayzza_expires_30_days.png" navigateTo="Favoritos" />
//           <Chip title="Meus Pedidos" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/ou3wlbab_expires_30_days.png" navigateTo="Pedidos" />
//           <Chip title="Chamar Ajuda" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0ao7ngym_expires_30_days.png" navigateTo="Ajuda" />
//           <Chip title="Perfil" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0x1aba14_expires_30_days.png" navigateTo="Perfil" />
//         </View>

//         <Divider />

//         {/* Cards */}
//         <Card
//           title="Pizza Tal"
//           description="Descrição da pizza"
//           image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
//           favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
//         />

//         <Card
//           title="Pizza Tal"
//           description="Descrição da pizza"
//           image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
//           favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
//         />

//         <Card
//           title="Pizza Tal"
//           description="Descrição da pizza"
//           image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
//           favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   list: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 16,
//   },
// });


// import React from "react";
// import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

// // Adicione esta interface para definir as props que o componente Card vai receber
// export interface CardProps {
//   title: string;
//   description: string;
//   image: string;
//   favoriteIcon: string;
// }

// // Use a interface CardProps para tipar as propriedades
// export default function Card({ title, description, image, favoriteIcon }: CardProps) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.content}>
//         <View>
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.description}>{description}</Text>
//         </View>
//         <Image
//           source={{ uri: image }}
//           style={styles.image}
//         />
//       </View>
//       <TouchableOpacity style={styles.favoriteButton}>
//         <Image
//           source={{ uri: favoriteIcon }}
//           style={styles.favoriteIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#F7F2E8",
//     borderRadius: 20,
//     marginVertical: 10,
//     marginHorizontal: 20,
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   content: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   image: {
//     width: 90,
//     height: 90,
//     borderRadius: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "Poppins_600SemiBold",
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     fontFamily: "Poppins_400Regular",
//     color: "#888",
//     width: 150,
//   },
//   favoriteButton: {
//     padding: 10,
//   },
//   favoriteIcon: {
//     width: 25,
//     height: 25,
//   },
// });

import React from "react";
import { ScrollView, View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes";
import Chip from "../components/dashboard/chip";
import Card from "../components/card";
import Divider from "../components/divider";

const screenWidth = Dimensions.get("window").width;

// tipagem da navegação
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// Remova as props do componente Home
export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScrollView style={{ backgroundColor: "#FAF6ED" }}>
      <View style={styles.container}>
        {/* Botão Sacola */}
        <View style={{ alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Sacola")}>
            <Image
              source={require("../../assets/img/sacola.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={{ alignItems: "flex-start" }}>
          <Image
            source={require("../../assets/img/header.png")}
            style={{
              width: screenWidth * 0.8,
              resizeMode: "contain",
              marginLeft: 20,
              marginBottom: -120,
              marginTop: -120,
            }}
          />
        </View>

        <Divider />

        {/* Chips */}
        <View style={styles.list}>
          <Chip title="Favoritos" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/o13ayzza_expires_30_days.png" navigateTo="Favoritos" />
          <Chip title="Meus Pedidos" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/ou3wlbab_expires_30_days.png" navigateTo="Pedidos" />
          <Chip title="Chamar Ajuda" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0ao7ngym_expires_30_days.png" navigateTo="Ajuda" />
          <Chip title="Perfil" image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/0x1aba14_expires_30_days.png" navigateTo="Perfil" />
        </View>

        <Divider />

        {/* Cards */}
        <Card
          title="Pizza Tal"
          description="Descrição da pizza"
          image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
          favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
        />

        <Card
          title="Pizza Tal"
          description="Descrição da pizza"
          image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
          favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
        />

        <Card
          title="Pizza Tal"
          description="Descrição da pizza"
          image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/8iff846e_expires_30_days.png"
          favoriteIcon="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hG9ovLsZ0q/q4smvm6w_expires_30_days.png"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
});