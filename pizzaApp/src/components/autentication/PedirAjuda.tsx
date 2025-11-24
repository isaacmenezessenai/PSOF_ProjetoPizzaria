import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// 1. Criamos a interface para definir o que esse componente aceita
interface Props {
  onRequestHelp: () => void; // Aceita uma função sem retorno
  loading?: boolean;         // Aceita um booleano opcional para loading
}

// 2. Recebemos as props aqui nos parênteses { onRequestHelp, loading }
export default function AuthAjuda({ onRequestHelp, loading }: Props) {
  return (
    <View style={styles.container}>
      {/* Aqui vai o seu layout atual (logo, textos, etc) */}
      <Text style={styles.title}>Precisa de algo?</Text>
      <Text style={styles.subtitle}>Chame o garçom com um toque.</Text>

      {/* 3. No botão principal, ligamos a função */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={onRequestHelp} // <--- AQUI ESTÁ A MÁGICA
        disabled={loading}      // Desabilita se estiver carregando
      >
        {loading ? (
          <ActivityIndicator size={24} color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>CHAMAR GARÇOM</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Mantenha seus estilos (exemplo genérico abaixo, use o seu original)
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#DDD',
    marginBottom: 24
  },
  button: {
    backgroundColor: '#FF3F4B',
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  }
});