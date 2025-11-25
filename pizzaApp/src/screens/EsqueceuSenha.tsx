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
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../services/api'; 

export default function EsqueceuSenha() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleResetPassword = async () => {
    if (email.trim() === "" || newPassword.trim() === "") {
      Alert.alert("Atenção", "Preencha o email e a nova senha.");
      return;
    }
    try {
      setLoading(true);
      await api.post('/password/reset', { email, newPassword });
      Alert.alert("Sucesso", "Senha atualizada!");
      navigation.goBack(); 
    } catch (error: any) {
      Alert.alert("Erro", error.response?.data?.error || "Erro ao atualizar.");
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
                        
                        <View style={styles.headerRow}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#1A1F3F" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Recuperar Senha</Text>
                        </View>

                        <Text style={styles.instructionText}>Informe seu email e crie uma nova senha.</Text>

                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/pg808laa_expires_30_days.png" }}
                            resizeMode={"contain"}
                            style={styles.imageStyle}
                        />
                        
                        <View style={styles.formContainer}>
                            <View style={styles.inputWrapper}>
                                <MaterialCommunityIcons name="email-outline" size={24} color="#9A1105" style={styles.icon} />
                                <TextInput
                                    placeholder={"Email Cadastrado"}
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    style={styles.input}
                                    placeholderTextColor="#A5A5A5"
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <MaterialCommunityIcons name="lock-reset" size={24} color="#9A1105" style={styles.icon} />
                                <TextInput
                                    placeholder={"Nova Senha"}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={hidePassword}
                                    style={styles.input}
                                    placeholderTextColor="#A5A5A5"
                                />
                                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                    <MaterialCommunityIcons name={hidePassword ? "eye-off-outline" : "eye-outline"} size={24} color="#A5A5A5" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity disabled={loading} style={[styles.button, { opacity: loading ? 0.6 : 1 }]} onPress={handleResetPassword}>
                                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>ATUALIZAR</Text>}
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                {/* Botão de Convidado FORA do card */}
                <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.guestText}>Entrar como convidado</Text>
                </TouchableOpacity>

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
    shadowOpacity: 0.2,
    shadowOffset: {width:0, height: 4},
    overflow: 'hidden',
    marginBottom: 30
  },
  gradient: { padding: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: 'center', marginBottom: 15, position: 'relative' },
  backButton: { position: 'absolute', left: 0, padding: 5 },
  headerTitle: { color: "#1A1F3F", fontSize: 20, fontWeight: "bold" },
  instructionText: { color: "#1A1F3F", fontSize: 14, textAlign: "center", marginBottom: 15 },
  imageStyle: { height: 100, marginBottom: 20, alignSelf: 'center', width: '80%' },
  formContainer: { paddingHorizontal: 5 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: "#FFFFFF", borderColor: "#E0E0E0",
    borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 15, paddingVertical: 8,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: "#10191F" },
  button: {
    padding: 12, borderRadius: 24, alignItems: 'center', marginTop: 10,
    backgroundColor: "#9A1105",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  guestButton: { alignItems: 'center', padding: 10 },
  guestText: { color: '#1A1F3F', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' },
});