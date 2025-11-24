import React, { useState, useEffect } from "react";
import { 
    SafeAreaView, 
    View, 
    ScrollView, 
    Image, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    TouchableOpacity, // 👈 NOVO: Importe TouchableOpacity para o clique
} from "react-native";
import BackButton from "../components/backButton";
import { api } from "../services/api"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

// Tipo para os dados do usuário que virão do endpoint /client/detail
interface UserDetail {
    id: string;
    name: string;
    email: string;
    cpf: string;
    dataNascimento: string; 
    // Outros campos que seu backend retornar, como created_at, favorites, etc.
}

export default function ConfiguracoesScreen() {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 🟢 NOVO ESTADO: Controla se a senha (mockada) está "visível"
    const [showPassword, setShowPassword] = useState(false); 

    // ===================================
    // FUNÇÃO PARA CARREGAR DADOS DO USUÁRIO
    // ===================================
    async function loadUserDetails() {
        setLoading(true);
        setError(null);

        try {
            // Se o seu endpoint real é /client/detail, mude a URL aqui.
            // Mantendo /me/client como você digitou por último.
            const response = await api.get("/me/client"); 
            
            const userData: UserDetail = response.data;

            setUser(userData);

        } catch (err: any) {
            console.error("Erro ao carregar detalhes do usuário:", err);
            
            if (err.response && err.response.status === 401) {
                
                await AsyncStorage.clear(); 
                setError("Sessão expirada. Faça login novamente.");
            } else {
                // Aqui é onde recebemos o 404/400 mesmo após a correção no backend
                setError("Não foi possível carregar os dados do usuário.");
            }
        } finally {
            setLoading(false);
        }
    }

    // 🟢 NOVA FUNÇÃO: Alterna a visualização mockada da senha
    const togglePasswordVisibility = () => {
        // Na vida real, você navegaria para uma tela de Mudança de Senha aqui.
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        loadUserDetails();
    }, []);

    // ... (Blocos de Loading, Error e !user são mantidos)
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
                {/* Você pode adicionar um botão para tentar novamente aqui */}
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Usuário não logado ou não encontrado.</Text>
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.mainContent}>
                    <BackButton />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>
                            Configurações
                        </Text>
                    </View>

                    <Image
                        source={{
                            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/nz917ssq_expires_30_days.png",
                        }}
                        resizeMode={"stretch"}
                        style={styles.wavyLine}
                    />

                    <View style={styles.infoContainer}>
                        {/* NOME */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nome</Text>
                            <Text style={styles.infoValue}>
                                {user.name} 
                            </Text>
                        </View>

                        {/* EMAIL */}
                        <View style={[styles.infoRow, { marginBottom: 0 }]}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>
                                {user.email}
                            </Text>
                        </View>
                    
                        {/* CPF */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>CPF</Text>
                            <Text style={styles.infoValue}>
                                {user.cpf}
                            </Text>
                        </View>
                    
                        {/* NASCIMENTO */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nascimento</Text>
                            <Text style={styles.infoValue}>
                                {/* Formatação simples da data: YYYY-MM-DD */}
                                {user.dataNascimento?.split('T')[0] || "N/A"} 
                            </Text>
                        </View>
                        
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
    // 🟢 ESTILOS AJUSTADOS PARA A LINHA DA SENHA SER CLICÁVEL
    passwordRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    editIcon: {
        width: 20,
        height: 20,
        marginLeft: 10 // Adicionado margem para separar do texto
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
    }
});