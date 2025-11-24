import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

// 👉 coloque o IP da sua máquina rodando o backend
const API_URL = "http://192.168.15.16:3333/session/client";

export default function Login() {
  const navigation: any = useNavigation();

  const [textInput1, onChangeTextInput1] = useState(""); // email
  const [textInput2, onChangeTextInput2] = useState(""); // senha
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 

  // =====================
  // FUNÇÃO DE LOGIN
  // =====================
  const handleLogin = async () => {
    setMessage("");

    if (!textInput1 || !textInput2) {
      setMessage("Preencha o email e a senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: textInput1,
          password: textInput2,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Erro desconhecido ao fazer login.";
        setMessage(errorMessage);
        console.log("Login failed data:", data);
        return;
      }
      
      // ==============================================================
      // 🚀 AÇÃO PRINCIPAL: SALVAR TOKEN E DADOS DO USUÁRIO
      // ==============================================================
      const { token, id, name, email, cpf, dataNascimento } = data;

      // 1. Salva o Token JWT
      await AsyncStorage.setItem('@ArtemisPizzaria:token', token);
      
      // 2. Salva os dados do usuário (em formato JSON stringificado)
      await AsyncStorage.setItem('@ArtemisPizzaria:user', JSON.stringify({ 
          id, 
          name, 
          email, 
          cpf, 
          dataNascimento 
      }));
      // ==============================================================

      setMessage("Login realizado com sucesso!");
      console.log("Auth data:", data);
      
      // Redireciona para Home
      navigation.replace("Home"); 

    } catch (error) {
      setMessage("Erro de conexão com o servidor. Verifique o IP e sua rede.");
      console.log("Connection error:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 100 }} 
            >
                {/* O restante do seu componente de UI permanece inalterado */}
                {/* HEADER */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 29,
                        marginTop: 15,
                        marginBottom: 13,
                    }}
                >
                    <Text
                        style={{
                            color: "#1A1F3F",
                            fontSize: 36,
                            fontWeight: "bold",
                            marginRight: 4,
                            flex: 1,
                        }}
                    >
                        {"Login"}
                    </Text>
                    <Text
                        style={{
                            color: "#1A1F3F",
                            fontSize: 24,
                            textAlign: "right",
                            flex: 1,
                        }}
                    >
                    </Text>
                </View>

                {/* SUBTÍTULO */}
                <View
                    style={{
                        paddingBottom: 1,
                        marginBottom: 13,
                        marginHorizontal: 42,
                    }}
                >
                    <Text
                        style={{
                            color: "#1A1F3F",
                            fontSize: 16,
                            textAlign: "center",
                        }}
                    >
                        {"Bem-vindo á Artemis Pizzaria"}
                    </Text>
                </View>

                {/* LOGO */}
                <Image
                    source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/s94n1t16_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={{
                        borderRadius: 19,
                        height: 38,
                        marginBottom: 13,
                    }}
                />

                {/* CAMPOS */}
                <View
                    style={{
                        paddingBottom: 12,
                        marginBottom: 13,
                        marginHorizontal: 15,
                    }}
                >
                    <TextInput
                        placeholder={"Email"}
                        value={textInput1}
                        onChangeText={onChangeTextInput1}
                        style={{
                            color: "#10191F",
                            fontSize: 16,
                            marginBottom: 8,
                            backgroundColor: "#FFFFFF",
                            borderColor: "#A5A5A5",
                            borderRadius: 14,
                            borderWidth: 1,
                            paddingVertical: 8,
                            paddingLeft: 20,
                            paddingRight: 40,
                            shadowColor: "#00000040",
                            shadowOpacity: 0.3,
                            shadowOffset: { width: 1, height: 1 },
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <View style={{ borderRadius: 20 }}>
                        <TextInput
                            placeholder={"Senha"}
                            value={textInput2}
                            secureTextEntry
                            onChangeText={onChangeTextInput2}
                            style={{
                                color: "#10191F",
                                fontSize: 16,
                                marginBottom: 15,
                                backgroundColor: "#FFFFFF",
                                borderColor: "#A5A5A5",
                                borderRadius: 14,
                                borderWidth: 1,
                                paddingVertical: 7,
                                paddingLeft: 20,
                                paddingRight: 40,
                                shadowColor: "#00000040",
                                shadowOpacity: 0.3,
                                shadowOffset: { width: 1, height: 1 },
                                shadowRadius: 4,
                                elevation: 4,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                borderColor: "#1A1F3F",
                                borderRadius: 13,
                                marginLeft: 235,
                            }}
                            onPress={() => setMessage("Funcionalidade de recuperação de senha não implementada.")}
                        >
                            <Text style={{ color: "#1A1F3F", fontSize: 13 }}>
                                Esqueceu a senha?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* FEEDBACK DE MENSAGEM */}
                {message ? (
                    <Text
                        style={{
                            textAlign: "center",
                            marginHorizontal: 15,
                            marginBottom: 10,
                            color: message.includes("sucesso") ? "green" : "red",
                            fontWeight: "bold",
                            fontSize: 14
                        }}
                    >
                        {message}
                    </Text>
                ) : null}

                {/* BOTÃO DE LOGIN */}
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        backgroundColor: "#9A1105",
                        borderColor: "#FFFFFF",
                        borderRadius: 24,
                        borderWidth: 1,
                        paddingVertical: 8,
                        marginBottom: 30,
                        marginHorizontal: 15,
                        opacity: loading ? 0.6 : 1,
                    }}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Entrar
                        </Text>
                    )}
                </TouchableOpacity>

                {/* DIVISOR (REMOVIDO JUNTO COM O BOTÃO GOOGLE) */}
                {/* CADASTRO */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 30,
                    }}
                >
                    <Text style={{ color: "#000000", fontSize: 14 }}>
                        {"Não tem uma conta? "}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text
                            style={{ fontWeight: "bold", color: "#1A1F3F", fontSize: 14 }}
                        >
                            Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* BOTÃO ENTRAR COMO CONVIDADO */}
            <TouchableOpacity 
                style={styles.guestButton} 
                onPress={() => navigation.replace('Home')}
            >
                <Text style={styles.guestText}>Entrar como convidado</Text>
            </TouchableOpacity>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 19,
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowOffset: { width: 3, height: 4 },
  },
  guestButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 28,
    backgroundColor: '#1A1F3F',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  guestText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});