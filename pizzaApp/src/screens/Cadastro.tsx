import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthCadastro from '../components/autentication/Cadastro';

export default function Cadastro() {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Reutiliza o componente de cadastro existente */}
        <AuthCadastro />

        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.guestText}>Entrar como convidado</Text>
        </TouchableOpacity>

        {/* TODO: ao integrar com backend, implemente criação de usuário e navegação condicional após sucesso */}
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
