import React from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatusPedido() {
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
          backgroundColor: "#FAF6ED",
        }}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/g8rbnjfr_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            height: 44,
            marginTop: 29,
            marginBottom: 13,
            marginHorizontal: 22,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 20,
            marginBottom: 13,
            marginHorizontal: 22,
          }}
        >
          <Text
            style={{
              color: "#10191F",
              fontSize: 28,
              fontWeight: "bold",
              marginRight: 110,
              flex: 1,
            }}
          >
            {"Verificar status do pedido"}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#1A1F3F",
              borderRadius: 18,
              paddingVertical: 10,
              paddingHorizontal: 12,
            }}
            onPress={() => alert("Mesa 21")}
          >
            <Text
              style={{
                color: "#FFFFFF",
              }}
            >
              {"Mesa 21"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            paddingVertical: 25,
            paddingLeft: 96,
            marginBottom: 13,
          }}
        >
          <Text
            style={{
              color: "#10191F",
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            {"Preparando"}
          </Text>
          <Text
            style={{
              color: "#9E9E9E",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              width: 90,
            }}
          >
            {"Indo até você"}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 10,
            marginBottom: 13,
            marginHorizontal: 22,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 20,
              textAlign: "center",
              marginHorizontal: 21,
            }}
          >
            {"Acompanhe seu pedido em tempo real diretamente da sua mesa."}
          </Text>
        </View>

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/87hnq6ap_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            height: 18,
            marginBottom: 13,
            marginHorizontal: 14,
          }}
        />

        <View
          style={{
            marginBottom: 13,
            marginHorizontal: 22,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              textAlign: "center",
              marginHorizontal: 10,
            }}
          >
            {
              "Está com alguma dúvida ou teve um problema? Clique no botão para pedir ajuda ao garçom."
            }
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 3,
            marginBottom: 261,
            marginHorizontal: 35,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#9A1105",
              borderColor: "#FFFFFF",
              borderRadius: 24,
              borderWidth: 1,
              paddingVertical: 1,
              marginHorizontal: 34,
            }}
            onPress={() =>
              alert("Seu pedido de ajuda foi enviado ao sistema!")
            }
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/s2hn1gts_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                borderRadius: 24,
                width: 36,
                height: 49,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {"Chamar Ajuda"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
