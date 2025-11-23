import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLogin from '../components/autentication/Login';

export default function Login() {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Reutiliza o componente de autenticação existente */}
        <AuthLogin />

        {/* Botão para entrar como convidado — navega para a tela principal (Home/MainTabs) */}
        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.guestText}>Entrar como convidado</Text>
        </TouchableOpacity>

        {/*
          TODO: integrar lógica de login aqui se preferir
          - chamar API do backend para autenticação
          - armazenar token / estado de usuário
          - tratar erros e loading
        */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
