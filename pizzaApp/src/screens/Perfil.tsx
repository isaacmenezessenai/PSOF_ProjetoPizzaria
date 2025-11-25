import React, { useState, useCallback } from "react";
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    TouchableOpacity, // 👈 NOVO: Importe TouchableOpacity para o clique
} from "react-native";
import BackButton from "../components/backButton";
import { api } from "../services/api"; 
import ProtectedScreen from "../components/ProtectedScreen";
import { useAuth } from "../contexts/AuthContext"; 

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
                <ActivityIndicator size="large" color="#FF6B35" />
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

                        <View style={styles.divider} />

                        {/* Email com Mascaramento */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>
                                {user.email}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        {/* CPF */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>CPF</Text>
                            <Text style={styles.infoValue}>
                                {user.cpf}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Data de Nascimento */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Data de Nascimento</Text>
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

    return <ProtectedScreen featureName="Perfil">{content}</ProtectedScreen>;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAF6ED",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FAF6ED",
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 16,
        color: '#999',
        marginBottom: 5,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    infoItem: {
        paddingVertical: 12,
    },
    infoLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 5,
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