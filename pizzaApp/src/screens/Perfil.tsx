import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text } from "react-native";
import BackButton from "../components/backButton";

export default function ConfiguracoesScreen() {
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

        <View
          style={{
            marginTop: 30,
            marginHorizontal: 14,
            flex: 1,
          }}
        >
         <BackButton />
          <View
            style={{
              alignItems: "center",
              paddingVertical: 18,
              marginBottom: 12,
              marginHorizontal: 13,
            }}
          >
            <Text
              style={{
                color: "#10191F",
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              Configurações
            </Text>
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/nz917ssq_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              height: 18,
              width: "120%",
              alignSelf: "center",
              marginBottom: 25,
            }}
          />


          <View style={{ paddingVertical: 9, marginHorizontal: 13 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 6,
                paddingHorizontal: 11,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#000", fontSize: 18 }}>Nome</Text>
              <Text style={{ color: "#000", fontSize: 18 }}>
                Felipe Oliveira
              </Text>
            </View>


            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 6,
                paddingHorizontal: 11,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#000", fontSize: 18 }}>Senha</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    marginRight: 10,
                  }}
                >
                  ****************
                </Text>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/a6vdnbbz_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            </View>

            {/* Email */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 6,
                paddingHorizontal: 11,
              }}
            >
              <Text style={{ color: "#000", fontSize: 18 }}>Email</Text>
              <Text style={{ color: "#000", fontSize: 18 }}>
                felipe@oliveira.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
