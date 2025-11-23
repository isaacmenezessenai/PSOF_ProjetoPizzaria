import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

// 👉 coloque o IP da sua máquina rodando o backend
const API_URL = "http://192.168.0.10:3333/login/client";

export default () => {
  const [textInput1, onChangeTextInput1] = useState(""); // email
  const [textInput2, onChangeTextInput2] = useState(""); // senha

  // =====================
  // FUNÇÃO DE LOGIN
  // =====================
  const handleLogin = async () => {
    if (!textInput1 || !textInput2) {
      alert("Preencha o email e a senha.");
      return;
    }

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
        alert(data.error || "Erro ao fazer login");
        return;
      }

      alert("Login realizado com sucesso!");
      console.log("Auth data:", data);

      // Se quiser navegar:
      // navigation.navigate("Home");

    } catch (error) {
      alert("Erro de conexão com o servidor");
      console.log(error);
    }
  };

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
            {"Login     "}
          </Text>
          <Text
            style={{
              color: "#1A1F3F",
              fontSize: 24,
              textAlign: "right",
              flex: 1,
            }}
          >
            {"X"}
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
              onPress={() => alert("Página esqueceu senha")}
            >
              <Text style={{ color: "#1A1F3F", fontSize: 13 }}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTÃO DE LOGIN */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#9A1105",
            borderColor: "#FFFFFF",
            borderRadius: 24,
            borderWidth: 1,
            paddingVertical: 8,
            marginBottom: 18,
            marginHorizontal: 15,
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        {/* DIVISOR */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 30,
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#000000" }} />
          <Text style={{ marginHorizontal: 10, color: "#000000" }}>ou</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#000000" }} />
        </View>

        {/* LOGIN COM GOOGLE */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "#A5A5A5",
            borderRadius: 14,
            borderWidth: 1,
            paddingVertical: 10,
            marginHorizontal: 40,
            marginBottom: 20,
          }}
          onPress={() => alert("Google Login!")}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, color: "#000000" }}>
            Continuar com Google
          </Text>
        </TouchableOpacity>

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
          <TouchableOpacity onPress={() => alert("Página de Cadastro")}>
            <Text
              style={{ fontWeight: "bold", color: "#1A1F3F", fontSize: 14 }}
            >
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
