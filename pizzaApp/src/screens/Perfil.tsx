import React, { useState, useCallback } from "react";
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
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
    const { user: authUser, isAuthenticated } = useAuth();
    const navigation = useNavigation<any>();
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // Função para mascarar email
    const maskEmail = (email: string) => {
        if (!email) return '';
        const [localPart, domain] = email.split('@');
        const masked = localPart.substring(0, 2) + '*'.repeat(Math.max(0, localPart.length - 2)) + '@' + domain;
        return masked;
    };

    async function loadUserDetails() {
        setLoading(true);
        try {
            const response = await api.get("/me/client"); 
            setUser(response.data);
        } catch (err: any) {
            console.error("Erro ao carregar detalhes do usuário:", err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (isAuthenticated) {
                loadUserDetails();
            } else {
                setLoading(false);
            }
        }, [isAuthenticated])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
            </View>
        );
    }
    const content = (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.mainContent}>
                    <BackButton />
                    
                    {/* Header com Avatar e Boas-vindas */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <MaterialIcons name="person" size={50} color="#FF6B35" />
                        </View>
                        <Text style={styles.welcomeText}>Bem-vindo,</Text>
                        <Text style={styles.userName}>{user?.name || authUser.name}</Text>
                    </View>

                    {/* Card de Informações */}
                    <View style={styles.infoCard}>
                        {/* Nome */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Nome Completo</Text>
                            <Text style={styles.infoValue}>{user?.name || authUser.name}</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Email com Mascaramento */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{maskEmail(user?.email || authUser.email)}</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* CPF */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>CPF</Text>
                            <Text style={styles.infoValue}>{user?.cpf || '••••••••••••'}</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Data de Nascimento */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Data de Nascimento</Text>
                            <Text style={styles.infoValue}>
                                {user?.dataNascimento ? user.dataNascimento.split('T')[0] : '••/••/••••'}
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
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FAF6ED"
    },
});