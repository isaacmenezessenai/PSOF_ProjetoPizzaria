import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

interface PedidoAtivoFABProps {
  temPedidoAtivo: boolean; 
  onClose?: () => void; 
}

const PedidoAtivoFAB: React.FC<PedidoAtivoFABProps> = ({ temPedidoAtivo, onClose }) => {
  const navigation = useNavigation();
  if (!temPedidoAtivo) {
    return null;
  }

  const handlePress = () => {
    navigation.navigate('StatusPedido' as never); 
  };

  return (
    <TouchableOpacity 
      style={styles.floatingButton} 
      onPress={handlePress}
    >
      {}
      <View style={styles.iconContainer}>
        <Text style={styles.initialText}>{'N'}</Text>
      </View>
      
      {}
      <Text style={styles.alertText}>1 Pedido Ativo</Text>

      {}
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={(e) => {
          e.stopPropagation(); 
          onClose();
        }}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 80, 
    right: 20, 
    zIndex: 10, 

    backgroundColor: '#CC0000', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    borderRadius: 30, 
    height: 50,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 5,
  },
  initialText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default PedidoAtivoFAB;