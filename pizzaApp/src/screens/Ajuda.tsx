import React, { useState } from "react";
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Alert, 
  ActivityIndicator 
} from "react-native";

import BackButton from "../components/backButton";
import { api } from "../services/api"; 
// 1. Importamos o contexto da mesa
import { useTable } from "../contexts/TableContext"; 

export default () => {
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(false); 
  
  // 2. Usamos o hook useTable para pegar o número da mesa que já está salvo na memória
  const { tableNumber } = useTable();

  async function handleCallWaiter() {
    try {
        setLoading(true);
        
        // 3. Verificamos se o número existe no contexto
        if (!tableNumber) {
            Alert.alert("Atenção", "Número da mesa não identificado. Por favor, leia o QR Code novamente.");
            setLoading(false);
            return;
        }

        // 4. Enviamos para o backend convertendo para número (pois no contexto geralmente é string)
        await api.post('/order/help', { 
            table: Number(tableNumber) 
        });
        
        Alert.alert("Sucesso", "O garçom foi notificado e já vem à sua mesa!");
        
    } catch (error) {
        console.log("Erro ao chamar garçom", error);
        Alert.alert("Erro", "Não foi possível chamar o garçom. Tente novamente.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        
        <View style={{ width: "100%", alignItems: "flex-start", padding: 20 }}>
          <BackButton />
        </View>

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/8ez15g89_expires_30_days.png",
          }}
          resizeMode="contain"
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
            marginBottom: 30,
          }}
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#101026",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Precisa de ajuda?
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#666666",
            textAlign: "center",
            paddingHorizontal: 40,
            marginBottom: 40,
          }}
        >
          Toque no botão abaixo para chamar o garçom até a sua mesa.
        </Text>

        <View style={{ width: "100%", paddingHorizontal: 30 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#9A1105",
              borderRadius: 24,
              paddingVertical: 14,
              paddingHorizontal: 28,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              opacity: loading ? 0.7 : 1, 
            }}
            onPress={handleCallWaiter} 
            disabled={loading} 
          >
            {loading ? (
                <ActivityIndicator color="#FFF" size="small" />
            ) : (
                <>
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
                    CHAMAR GARÇOM
                    </Text>
                </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};