import React, { useState, useEffect } from "react";
import { 
    SafeAreaView, 
    View, 
    ScrollView, 
    Image, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    TouchableOpacity, 
    Alert // 👈 Importe Alert para confirmação (opcional)
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native"; // 👈 Importe hooks de navegação
import BackButton from "../components/backButton";
import { api } from "../services/api"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

interface UserDetail {
    id: string;
    name: string;
    email: string;
    cpf: string;
    dataNascimento: string; 
}

export default function ConfiguracoesScreen() {
    const navigation = useNavigation(); // 👈 Inicializa a navegação
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false); 

    async function loadUserDetails() {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/me/client"); 
            const userData: UserDetail = response.data;
            setUser(userData);
        } catch (err: any) {
            console.error("Erro ao carregar detalhes:", err);
            if (err.response && err.response.status === 401) {
                handleLogout(); // 👈 Se der 401, faz logout automático
            } else {
                setError("Não foi possível carregar os dados do usuário.");
            }
        } finally {
            setLoading(false);
        }
    }

    // 🟢 NOVA FUNÇÃO: Lógica de Logout
    async function handleLogout() {
        try {
            // 1. Limpa os dados locais (Token, dados do user, etc)
            await AsyncStorage.clear(); 

            // 2. Redireciona para a tela de Login e "mata" o histórico para não poder voltar
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], // ⚠️ IMPORTANTE: Verifique se sua rota chama 'Login' ou 'SignIn'
                })
            );
        } catch (error) {
            console.error("Erro ao sair:", error);
            Alert.alert("Erro", "Não foi possível fazer logout.");
        }
    }

    // Função auxiliar para confirmar antes de sair (UX melhor)
    const confirmLogout = () => {
        Alert.alert(
            "Sair da conta",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", style: "destructive", onPress: handleLogout }
            ]
        );
    };

    useEffect(() => {
        loadUserDetails();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#9A1105" />
                <Text style={styles.loadingText}>Carregando informações...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}> 🚨 {error}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.errorButton}>
                    <Text style={styles.errorButtonText}>Voltar para Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Usuário não encontrado.</Text>
                <TouchableOpacity onPress={handleLogout}>
                     <Text style={{color: '#9A1105', marginTop: 20}}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.mainContent}>
                    <BackButton />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Configurações</Text>
                    </View>

                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/nz917ssq_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.wavyLine}
                    />

                    <View style={styles.infoContainer}>
                        {/* NOME */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nome</Text>
                            <Text style={styles.infoValue}>{user.name}</Text>
                        </View>

                        {/* EMAIL */}
                        <View style={[styles.infoRow, { marginBottom: 0 }]}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{user.email}</Text>
                        </View>
                    
                        {/* CPF */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>CPF</Text>
                            <Text style={styles.infoValue}>{user.cpf}</Text>
                        </View>
                    
                        {/* NASCIMENTO */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nascimento</Text>
                            <Text style={styles.infoValue}>
                                {user.dataNascimento?.split('T')[0] || "N/A"} 
                            </Text>
                        </View>
                    </View>

                    {/* 🟢 BOTÃO DE LOGOUT ADICIONADO AQUI */}
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
                            <Text style={styles.logoutText}>Sair da conta</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FAF6ED",
    },
    mainContent: {
        marginTop: 30,
        marginHorizontal: 14,
        flex: 1,
    },
    headerTitleContainer: {
        alignItems: "center",
        paddingVertical: 18,
        marginBottom: 12,
        marginHorizontal: 13,
    },
    headerTitle: {
        color: "#10191F",
        fontSize: 32,
        fontWeight: "bold",
    },
    wavyLine: {
        height: 18,
        width: "120%",
        alignSelf: "center",
        marginBottom: 25,
    },
    infoContainer: {
        paddingVertical: 9,
        marginHorizontal: 13,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        paddingHorizontal: 11,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0' 
    },
    infoLabel: {
        color: "#000",
        fontSize: 18,
        fontWeight: '500'
    },
    infoValue: {
        color: "#000",
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FAF6ED"
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#9A1105"
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: "#D32F2F",
        textAlign: 'center',
        fontWeight: 'bold'
    },
    errorButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#D32F2F',
        borderRadius: 8
    },
    errorButtonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    // 🟢 ESTILOS DO LOGOUT
    logoutContainer: {
        marginTop: 40,
        paddingHorizontal: 13,
        alignItems: 'center',
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#FDEcea', // Um fundo vermelho bem claro
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#9A1105',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#9A1105', // Usando a cor temática vermelha do seu app
        fontSize: 18,
        fontWeight: 'bold',
    }
});