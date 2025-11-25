import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
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
import DateTimePicker from '@react-native-community/datetimepicker'; // <--- Importado
import { api } from '../services/api';
import Divider from "../components/divider";

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
    // No Android, o picker fecha ao selecionar. 
    // No iOS, precisamos controlar o fechamento manualmente se quisermos.
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

  const handleRegister = async () => {
    setMessage("");
    if (!nome || !email || !senha || !confirmarSenha || !cpf || !dataNascimento) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }
    if (senha !== confirmarSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }
    if (cpf.length < 11) {
      setMessage("CPF incompleto.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/users/client", {
        name: nome,
        email: email,
        password: senha,
        cpf: cpf,
        dataNascimento: dataNascimento,
      });
      setMessage("Sucesso! Redirecionando...");
      setTimeout(() => navigation.navigate("Login"), 1500);
    } catch (error: any) {
      if (error.response) setMessage(error.response.data.error || "Erro ao cadastrar.");
      else setMessage("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            <LinearGradient colors={['#FFFFFF', '#FFF3E0']} style={styles.gradient}>

                <View>
                <Divider/>
                </View>

                <View style={styles.inputsContainer}>
                  
                  {/* Nome */}
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="account-outline" size={20} color="#9A1105" style={styles.icon} />
                    <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} placeholderTextColor="#A5A5A5"/>
                  </View>

                  {/* Email */}
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#9A1105" style={styles.icon} />
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} placeholderTextColor="#A5A5A5"/>
                  </View>

                  {/* CPF */}
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#9A1105" style={styles.icon} />
                    <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" maxLength={11} style={styles.input} placeholderTextColor="#A5A5A5"/>
                  </View>

                  {/* CAMPO DE DATA DE NASCIMENTO (PICKER) */}
                  <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="calendar-range" size={20} color="#9A1105" style={styles.icon} />
                    {/* Exibe o texto ou o placeholder se estiver vazio */}
                    <Text style={[styles.input, { color: dataNascimento ? "#10191F" : "#A5A5A5", paddingTop: 3 }]}>
                        {dataNascimento || "Data de Nascimento"}
                    </Text>
                  </TouchableOpacity>

                  {/* Componente DateTimePicker (Invisível até ser ativado) */}
                  {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default" 
                        onChange={onChangeDate}
                        maximumDate={new Date()} // Não permite datas futuras
                    />
                  )}

                  {/* Senha */}
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#9A1105" style={styles.icon} />
                    <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={hidePassword} style={styles.input} placeholderTextColor="#A5A5A5"/>
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <MaterialCommunityIcons name={hidePassword ? "eye-off-outline" : "eye-outline"} size={20} color="#A5A5A5" />
                    </TouchableOpacity>
                  </View>

                  {/* Confirmar Senha */}
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="lock-check-outline" size={20} color="#9A1105" style={styles.icon} />
                    <TextInput placeholder="Confirmar Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={hidePassword} style={styles.input} placeholderTextColor="#A5A5A5"/>
                  </View>
                </View>

                {message ? <Text style={[styles.msg, {color: message.includes("Sucesso") ? "green" : "#D32F2F"}]}>{message}</Text> : null}

                <TouchableOpacity style={[styles.btnCadastro, { opacity: loading ? 0.6 : 1 }]} onPress={handleRegister} disabled={loading}>
                  {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={styles.textCadastro}>Finalizar Cadastro</Text>}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={{ fontSize: 13 }}>Já tem conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Faça Login</Text>
                  </TouchableOpacity>
                </View>

            </LinearGradient>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
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
  },
  gradient: { padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  title: { color: "#1A1F3F", fontSize: 26, fontWeight: "bold" },
  subtitle: { color: "#1A1F3F", fontSize: 14 },
  inputsContainer: { marginBottom: 10 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: "#FFFFFF", borderColor: "#E0E0E0",
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 15, paddingVertical: 12, // Um pouco maior para facilitar o toque no picker
    marginBottom: 10,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: "#10191F", fontSize: 15 },
  msg: { textAlign: "center", marginBottom: 10, fontWeight: "bold", fontSize: 13 },
  btnCadastro: {
    alignItems: "center", backgroundColor: "#9A1105",
    borderRadius: 30, paddingVertical: 12,
    marginHorizontal: 10, marginBottom: 15,
  },
  textCadastro: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loginContainer: { flexDirection: "row", justifyContent: "center" },
  loginLink: { fontWeight: "bold", color: "#1A1F3F", textDecorationLine: "underline" },
});