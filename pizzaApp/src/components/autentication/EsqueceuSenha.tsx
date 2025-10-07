import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, TouchableOpacity,
} from "react-native";

export default () => {
  const [textInput1, onChangeTextInput1] = useState("");

  const handleResetPassword = () => {
    if (textInput1.trim() === "") {
      alert("Por favor, preencha o campo de email antes de prosseguir.");
    } else {
      alert("Um link para redefinir sua senha foi enviado para o seu email!");
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 36,
            marginBottom: 21,
            marginHorizontal: 29,
          }}
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/5qnguzsl_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              width: 32,
              height: 32,
              marginRight: 73,
            }}
          />
          <Text
            style={{
              color: "#1A1F3F",
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "right",
              flex: 1,
            }}
          >
            {"Esqueceu a \nsenha?"}
          </Text>
        </View>

        <View
          style={{
            marginBottom: 18,
            marginHorizontal: 42,
          }}
        >
          <Text
            style={{
              color: "#1A1F3F",
              fontSize: 16,
              textAlign: "center",
              marginHorizontal: 21,
            }}
          >
            {"Informe o email para o qual deseja redefinir sua senha."}
          </Text>
        </View>

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/pg808laa_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={{
            borderRadius: 19,
            height: 38,
            marginBottom: 13,
          }}
        />

        <TextInput
          placeholder={"Email"}
          value={textInput1}
          onChangeText={onChangeTextInput1}
          style={{
            color: "#10191F",
            fontSize: 16,
            marginBottom: 13,
            marginHorizontal: 27,
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

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#9A1105",
            borderColor: "#FFFFFF",
            borderRadius: 24,
            borderWidth: 1,
            paddingVertical: 8,
            marginBottom: 290,
            marginHorizontal: 27,
          }}
          onPress={handleResetPassword}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"Redefinir senha"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
