import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import BackButton from "../components/backButton";

export default () => {
  const screenWidth = Dimensions.get("window").width; // pega a largura da tela

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderColor: "#000000",
          borderRadius: 19,
          borderWidth: 2,
          shadowColor: "#000000",
          shadowOpacity: 1.0,
          shadowOffset: { width: 3, height: 4 },
        }}
      >
        {/* Cabeçalho */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 24,
            marginHorizontal: 24,
          }}
        >
          <BackButton />

          <Text
            style={{
              color: "#10191F",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "right",
              flex: 1,
            }}
          >
            Chamar{"\n"}Ajuda
          </Text>
        </View>

        {/* Linha decorativa */}
        <View
          style={{
            alignItems: "center",
            marginTop: 28,
            marginBottom: 36,
          }}
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/6oz44nr2_expires_30_days.png",
            }}
            resizeMode="contain"
            style={{
              width: screenWidth * 0.6, // ocupa 60% da largura da tela
              height: 18,
            }}
          />
        </View>

        {/* Texto explicativo */}
        <View
          style={{
            marginHorizontal: 36,
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 20,
              textAlign: "center",
              lineHeight: 28,
            }}
          >
            Está com alguma dúvida ou teve um problema?{"\n"}
            Clique no botão para pedir ajuda ao garçom.
          </Text>
        </View>

        {/* Botão "Chamar Ajuda" */}
        <View
          style={{
            alignItems: "center",
            marginBottom: 120,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#9A1105",
              borderRadius: 24,
              paddingVertical: 14,
              paddingHorizontal: 28,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => alert("Sua ajuda foi solicitada ao servidor!")}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/rmcpnr6i_expires_30_days.png",
              }}
              resizeMode="contain"
              style={{
                width: 32,
                height: 32,
                marginRight: 12,
              }}
            />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Chamar Ajuda
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
