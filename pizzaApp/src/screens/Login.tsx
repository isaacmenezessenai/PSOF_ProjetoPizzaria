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
    KeyboardAvoidingView,
    Platform
} from "react-native";
import Divider from "../components/divider";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../services/api';

export default function Login() {
    const navigation: any = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async () => {
        setMessage("");
        if (!email || !senha) {
            setMessage("Preencha o email e a senha.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/session/client', {
                email: email,
                password: senha,
            });
            const { token, id, name, cpf, dataNascimento } = response.data;
            await AsyncStorage.setItem('@ArtemisPizzaria:token', token);
            await AsyncStorage.setItem('@ArtemisPizzaria:user', JSON.stringify({ id, name, email, cpf, dataNascimento }));
            setMessage("Login realizado com sucesso!");
            navigation.replace("Home");
        } catch (error: any) {
            if (error.response) {
                setMessage(error.response.data.error || "Erro ao fazer login.");
            } else if (error.request) {
                setMessage("Erro de conexão. Verifique o IP.");
            } else {
                setMessage("Erro desconhecido.");
            }
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
                    
                    {/* O CARD AGORA É APENAS ESTE BLOCO */}
                    <View style={styles.card}>
                        <LinearGradient
                            colors={['#FFFFFF', '#FFF3E0']}
                            style={styles.gradient}
                        >
                            {/* Conteúdo do Card */}
                            <Text style={styles.headerTitle}>Login</Text>
                            <Text style={styles.subTitle}>Bem-vindo à Artemis Pizzaria</Text>

                            <Image
                                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/s94n1t16_expires_30_days.png" }}
                                resizeMode={"contain"}
                                style={styles.logo}
                            />

                            <View style={styles.divider}>
                            <Divider/>
                            </View>

                            <View style={styles.inputsContainer}>
                                <View style={styles.inputWrapper}>
                                    <MaterialCommunityIcons name="email-outline" size={24} color="#9A1105" style={styles.icon} />
                                    <TextInput
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        placeholderTextColor="#A5A5A5"
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <MaterialCommunityIcons name="lock-outline" size={24} color="#9A1105" style={styles.icon} />
                                    <TextInput
                                        placeholder="Senha"
                                        value={senha}
                                        secureTextEntry={hidePassword}
                                        onChangeText={setSenha}
                                        style={styles.input}
                                        placeholderTextColor="#A5A5A5"
                                    />
                                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                        <MaterialCommunityIcons name={hidePassword ? "eye-off-outline" : "eye-outline"} size={24} color="#A5A5A5" />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('EsqueceuSenha')}>
                                    <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                                </TouchableOpacity>
                            </View>

                            {message ? <Text style={[styles.messageText, { color: message.includes("sucesso") ? "green" : "#D32F2F" }]}>{message}</Text> : null}

                            <TouchableOpacity style={[styles.loginButton, { opacity: loading ? 0.6 : 1 }]} onPress={handleLogin} disabled={loading}>
                                {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={styles.loginButtonText}>Entrar</Text>}
                            </TouchableOpacity>

                            <View style={styles.registerContainer}>
                                <Text style={{ color: "#000" }}>{"Não tem uma conta? "}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                    <Text style={styles.registerText}>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Botão de Convidado FORA do card, logo abaixo */}
                    <TouchableOpacity style={styles.guestButton} onPress={() => navigation.replace('Home')}>
                        <Text style={styles.guestText}>Entrar como convidado</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    divider: {
        marginTop: -65,
    },
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    gradient: {
        paddingVertical: 25, // Padding interno do card
        paddingHorizontal: 15,
    },
    headerTitle: {
        color: "#1A1F3F",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 10,
    },
    subTitle: {
        color: "#1A1F3F",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    logo: {
        height: 40,
        marginBottom: 25,
        alignSelf: 'center',
        width: '60%',
    },
    inputsContainer: {
        paddingHorizontal: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 8, // Altura um pouco menor para ficar mais compacto
        marginBottom: 12,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, color: "#10191F", fontSize: 16 },
    forgotPasswordButton: { alignSelf: 'flex-end', marginBottom: 15 },
    forgotPasswordText: { color: "#1A1F3F", fontSize: 12, fontWeight: "600" },
    messageText: { textAlign: "center", marginBottom: 10, fontSize: 13, fontWeight: 'bold' },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#9A1105",
        borderRadius: 24,
        paddingVertical: 12,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    loginButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
    registerContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
    registerText: { fontWeight: "bold", color: "#1A1F3F" },
    
    // Botão Convidado (Discreto, fora do card)
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