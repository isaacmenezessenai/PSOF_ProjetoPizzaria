import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// 👉 coloque o IP da sua máquina rodando o backend
// Assumindo que o endpoint de criação é /users/client
const API_URL = "http://192.168.1.100:3333/users/client";

export default function Cadastro() {
  const navigation: any = useNavigation();

  // Estados para os campos de entrada
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =====================
  // FUNÇÃO DE CADASTRO
  // =====================
  const handleRegister = async () => {
    setMessage("");

    // Validação de campos obrigatórios
    if (!nome || !email || !senha || !confirmarSenha || !cpf || !dataNascimento) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de senha
    if (senha !== confirmarSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }

    // Validação de CPF (básica)
    if (cpf.length < 11) {
      setMessage("O CPF parece incompleto.");
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
          name: nome,
          email: email,
          password: senha,
          cpf: cpf,
          dataNascimento: dataNascimento,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Erro desconhecido ao cadastrar.";
        setMessage(errorMessage);
        console.log("Registration failed data:", data);
        return;
      }

      // Sucesso
      setMessage("Cadastro realizado com sucesso! Redirecionando para o Login...");

      // ✅ AÇÃO SOLICITADA: Redirecionar para a tela de Login
      navigation.navigate("Login");

    } catch (error) {
      // Erro de rede/conexão
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
          style={styles.scrollViewStyle}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Cadastre-se</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            </TouchableOpacity>
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
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="CPF (apenas números)"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maxLength={11}
              style={styles.input}
            />
            <TextInput
              placeholder="Data Nasc. (DD/MM/AAAA)"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              keyboardType="numbers-and-punctuation"
              style={styles.input}
            />
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Feedback de Mensagem */}
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

          {/* Botão Cadastro */}
          <TouchableOpacity
            style={[styles.btnCadastro, { opacity: loading ? 0.6 : 1 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.textCadastro}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          {/* ✅ REMOVIDO: DIVISOR E BOTÃO DO GOOGLE */}

          {/* Login */}
          <View style={styles.loginContainer}>
            <Text style={{ color: "#000", fontSize: 13 }}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Faça Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Botão Entrar como Convidado */}
        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.replace('Home')}>
          <Text style={styles.guestText}>Entrar como convidado</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6EC",
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 19,
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowOffset: { width: 3, height: 4 },
    margin: 10,
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
    marginBottom: 30, // Mantido para dar espaço antes do link de login
  },
  textCadastro: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilos do Google/Divider removidos
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 30,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#1A1F3F",
    fontSize: 13,
    textDecorationLine: "underline",
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