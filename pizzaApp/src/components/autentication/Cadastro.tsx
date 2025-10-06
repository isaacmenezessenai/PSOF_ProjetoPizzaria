import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity, StyleSheet,} from "react-native";
export default () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cadastre-se</Text>
          <Text style={styles.close}>X</Text>
        </View>

        {/* Subtítulo */}
        <View style={{ marginBottom: 10, marginHorizontal: 42 }}>
          <Text style={styles.subtitle}>
            Bem-vindo á <Text style={{ fontWeight: "bold" }}>Artemis Pizzaria</Text>
          </Text>
        </View>

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

        {/* Inputs */}
        <View style={{ marginHorizontal: 20 }}>
          <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Botão Cadastro */}
        <TouchableOpacity style={styles.btnCadastro} onPress={() => alert("Cadastro realizado!")}>
          <Text style={styles.textCadastro}>Cadastro</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={{ marginHorizontal: 10, color: "#444" }}>ou</Text>
          <View style={styles.divider} />
        </View>

        {/* Botão Google */}
        <TouchableOpacity style={styles.btnGoogle}>
          <Text style={styles.textGoogle}>Continuar com Google</Text>
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }}
            style={styles.googleLogo}
          />
        </TouchableOpacity>

        {/* Login */}
        <View style={styles.loginContainer}>
          <Text style={{ color: "#000", fontSize: 13 }}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => alert("Ir para Login")}>
            <Text style={styles.loginLink}>Faça Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6EC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 13,
    marginHorizontal: 29,
  },
  title: {
    color: "#1A1F3F",
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
  close: {
    color: "#1A1F3F",
    fontSize: 24,
    textAlign: "right",
    flex: 1,
  },
  subtitle: {
    color: "#1A1F3F",
    fontSize: 15,
    textAlign: "center",
  },
  wave: {
    height: 30,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    color: "#10191F",
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#A5A5A5",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    elevation: 2,
  },
  btnCadastro: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9A1105",
    borderRadius: 30,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 10,
  },
  textCadastro: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#aaa",
  },
  btnGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  textGoogle: {
    fontSize: 15,
    color: "#000",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#1A1F3F",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
