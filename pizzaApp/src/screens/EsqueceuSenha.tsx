import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Verifique se o caminho da api está correto conforme suas pastas
import { api } from '../services/api'; 

export default function EsqueceuSenha() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (email.trim() === "" || newPassword.trim() === "") {
      Alert.alert("Atenção", "Preencha o email e a nova senha.");
      return;
    }

    try {
      setLoading(true);

      // Envia os dados para o backend
      await api.post('/password/reset', {
        email: email,
        newPassword: newPassword 
      });

      

    } catch (error: any) {
      console.log(error);
      const msg = error.response?.data?.error || "Erro ao atualizar senha.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Cabeçalho */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 36, marginBottom: 21, marginHorizontal: 29 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/5qnguzsl_expires_30_days.png" }}
                resizeMode={"stretch"}
                style={{ width: 32, height: 32, marginRight: 20 }}
              />
            </TouchableOpacity>
            
            <Text style={{ color: "#1A1F3F", fontSize: 32, fontWeight: "bold", textAlign: "right", flex: 1 }}>
              {"Esqueceu a \nsenha?"}
            </Text>
        </View>

        {/* Texto Instrução */}
        <View style={{ marginBottom: 18, marginHorizontal: 42 }}>
            <Text style={{ color: "#1A1F3F", fontSize: 16, textAlign: "center", marginHorizontal: 21 }}>
              {"Informe seu email e crie uma nova senha."}
            </Text>
        </View>

        {/* Imagem */}
        <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/pg808laa_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={{ borderRadius: 19, height: 38, marginBottom: 13, alignSelf: 'center', width: '80%' }}
        />
        
        {/* Formulário */}
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            
            {/* INPUT DE EMAIL */}
            <TextInput
              placeholder={"Seu Email Cadastrado"}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            {/* INPUT DE NOVA SENHA */}
            <TextInput
              placeholder={"Sua Nova Senha"}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true} // Esconde a senha
              style={styles.input}
            />

            {/* Botão de Ação */}
            <TouchableOpacity
              disabled={loading}
              style={[styles.button, { backgroundColor: loading ? "#ccc" : "#9A1105" }]}
              onPress={handleResetPassword} 
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
                    ATUALIZAR SENHA
                </Text>
              )}
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Botão de Convidado (Rodapé) */}
      <TouchableOpacity 
          style={styles.guestButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.guestText}>Entrar como convidado</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#A5A5A5",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#10191F",
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    padding: 15,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});