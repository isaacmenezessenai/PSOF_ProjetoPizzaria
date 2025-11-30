import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Divider from "../components/divider";

// 👉 coloque o IP da sua máquina rodando o backend
const API_URL = "http://192.168.1.109:3333/users/client";

export default function Cadastro() {
  const navigation: any = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  
  // Lógica da Data
  const [dataNascimento, setDataNascimento] = useState(""); // String formatada para enviar pra API
  const [date, setDate] = useState(new Date()); // Objeto Date para o Picker
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  // Função disparada ao escolher uma data
  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate) {
      setDate(selectedDate);
      // Formata a data para DD/MM/AAAA
      const dia = selectedDate.getDate().toString().padStart(2, '0');
      const mes = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataNascimento(`${dia}/${mes}/${ano}`);
    }
  };

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
      
      // Redirecionar para a tela de Login
      setTimeout(() => navigation.navigate("Login"), 1500);

    } catch (error) {
      setMessage("Erro de conexão com o servidor. Verifique o IP e sua rede.");
      console.log("Connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          {/* CARD PRINCIPAL */}
          <View style={styles.card}>
            <LinearGradient
              colors={['#FFFFFF', '#FFF3E0']}
              style={styles.gradient}
            >
              {/* HEADER */}
              <Text style={styles.title}>Cadastre-se</Text>
              <Text style={styles.subtitle}>
                Bem-vindo à <Text style={{ fontWeight: "bold" }}>Artemis Pizzaria</Text>
              </Text>

              {/* LOGO */}
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/s94n1t16_expires_30_days.png",
                }}
                resizeMode={"contain"}
                style={styles.logo}
              />

              <View>
                <Divider/>
              </View>

              {/* INPUTS */}
              <View style={styles.inputsContainer}>
                
                {/* Nome */}
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons 
                    name="account-outline" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <TextInput 
                    placeholder="Nome" 
                    value={nome} 
                    onChangeText={setNome} 
                    style={styles.input} 
                    placeholderTextColor="#A5A5A5"
                  />
                </View>

                {/* Email */}
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons 
                    name="email-outline" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <TextInput 
                    placeholder="Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address" 
                    autoCapitalize="none" 
                    style={styles.input} 
                    placeholderTextColor="#A5A5A5"
                  />
                </View>

                {/* CPF */}
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons 
                    name="card-account-details-outline" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <TextInput 
                    placeholder="CPF (apenas números)" 
                    value={cpf} 
                    onChangeText={setCpf} 
                    keyboardType="numeric" 
                    maxLength={11} 
                    style={styles.input} 
                    placeholderTextColor="#A5A5A5"
                  />
                </View>

                {/* CAMPO DE DATA DE NASCIMENTO (PICKER) */}
                <TouchableOpacity 
                  onPress={() => setShowPicker(true)} 
                  style={styles.inputWrapperDate}
                >
                  <MaterialCommunityIcons 
                    name="calendar-range" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <Text 
                    style={[
                      styles.input, 
                      { 
                        color: dataNascimento ? "#10191F" : "#A5A5A5", 
                        paddingTop: 3 
                      }
                    ]}
                  >
                    {dataNascimento || "Data de Nascimento"}
                  </Text>
                </TouchableOpacity>

                {/* Componente DateTimePicker */}
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default" 
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                  />
                )}

                {/* Senha */}
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons 
                    name="lock-outline" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <TextInput 
                    placeholder="Senha" 
                    value={senha} 
                    onChangeText={setSenha} 
                    secureTextEntry={hidePassword} 
                    style={styles.input} 
                    placeholderTextColor="#A5A5A5"
                  />
                  <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                    <MaterialCommunityIcons 
                      name={hidePassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#A5A5A5" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirmar Senha */}
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons 
                    name="lock-check-outline" 
                    size={20} 
                    color="#9A1105" 
                    style={styles.icon} 
                  />
                  <TextInput 
                    placeholder="Confirmar Senha" 
                    value={confirmarSenha} 
                    onChangeText={setConfirmarSenha} 
                    secureTextEntry={hidePassword} 
                    style={styles.input} 
                    placeholderTextColor="#A5A5A5"
                  />
                </View>
              </View>

              {/* FEEDBACK DE MENSAGEM */}
              {message ? (
                <Text 
                  style={[
                    styles.msg, 
                    { color: message.includes("sucesso") ? "green" : "#D32F2F" }
                  ]}
                >
                  {message}
                </Text>
              ) : null}

              {/* BOTÃO CADASTRO */}
              <TouchableOpacity
                style={[styles.btnCadastro, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.textCadastro}>Finalizar Cadastro</Text>
                )}
              </TouchableOpacity>

              {/* LOGIN */}
              <View style={styles.loginContainer}>
                <Text style={{ fontSize: 13 }}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Faça Login</Text>
                </TouchableOpacity>
              </View>

            </LinearGradient>
          </View>

          {/* BOTÃO ENTRAR COMO CONVIDADO */}
          <TouchableOpacity 
            style={styles.guestButton} 
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.guestText}>Entrar como convidado</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F2F2F2" 
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  card: {
    width: '100%',
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: { 
    padding: 20 
  },
  title: { 
    color: "#1A1F3F", 
    fontSize: 26, 
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: { 
    color: "#1A1F3F", 
    fontSize: 14,
    textAlign: 'center',
    marginBottom: -45,
  },
  logo: {
    height: 40,
    marginBottom: 20,
    alignSelf: 'center',
    width: '60%',
  },
  inputsContainer: { 
    marginBottom: 10,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: "#FFFFFF", 
    borderColor: "#E0E0E0",
    borderRadius: 12, 
    borderWidth: 1,
    paddingHorizontal: 15, 
    paddingVertical: 12,
    marginBottom: 10,
  },
  inputWrapperDate: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: "#FFFFFF", 
    borderColor: "#E0E0E0",
    borderRadius: 12, 
    borderWidth: 1,
    paddingHorizontal: 15, 
    paddingVertical: 20,
    marginBottom: 10,
  },
  icon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    color: "#10191F", 
    fontSize: 15 
  },
  msg: { 
    textAlign: "center", 
    marginBottom: 10, 
    fontWeight: "bold", 
    fontSize: 13 
  },
  btnCadastro: {
    alignItems: "center", 
    backgroundColor: "#9A1105",
    borderRadius: 30, 
    paddingVertical: 12,
    marginHorizontal: 10, 
    marginBottom: 15,
  },
  textCadastro: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  loginContainer: { 
    flexDirection: "row", 
    justifyContent: "center",
    marginBottom: 5,
  },
  loginLink: { 
    fontWeight: "bold", 
    color: "#1A1F3F", 
    textDecorationLine: "underline" 
  },
  guestButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  guestText: {
    color: '#1A1F3F',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
});