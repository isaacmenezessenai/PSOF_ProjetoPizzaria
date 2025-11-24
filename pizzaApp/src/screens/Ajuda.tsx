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
import { api } from "../services/api"; // Certifique-se que o caminho está correto

export default () => {
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(false); // Estado para evitar cliques duplos

  // Função que chama o Backend
  async function handleCallWaiter() {
    try {
        setLoading(true);
        
        // TODO: Recuperar mesa do AsyncStorage se necessário
        const tableNumber = 777; 

        // Envia para a rota que criamos no backend
        await api.post('/order/help', { 
            table: tableNumber 
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

        {/* Botão "Chamar Ajuda" */}
        <View
          style={{
            alignItems: "center",
            marginTop: 100, // Ajustei margins para centralizar melhor visualmente
            marginBottom: 120,
          }}
        >
          <TouchableOpacity
            disabled={loading} // Desabilita o botão enquanto carrega
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
              opacity: loading ? 0.7 : 1, // Feedback visual de desabilitado
            }}
            onPress={handleCallWaiter} // Chama a função real
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