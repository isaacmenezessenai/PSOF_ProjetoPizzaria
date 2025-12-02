import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTable } from "../contexts/TableContext";
import axios from 'axios';
// Importação de ícones (Padrão Expo/React Native)
import { Feather } from '@expo/vector-icons'; 

// --- DEFINIÇÕES DE TIPOS E VARIÁVEIS DE API ---

const API_HOSTS = ["http://10.180.125.21:3333"]; 

const API_TIMEOUT_MS = 15000;

interface Product {
  name: string;
  price: string | number | undefined;
}

interface Item {
  product: Product | null | undefined;
  amount: number;
}

interface Order {
  id: string | number;
  draft: boolean;
  status: string | boolean;
  items: Item[];
  [key: string]: any;
}

// --- FUNÇÕES DE API ---
async function fetchFromAnyHost(path: string) {
  let lastErr: any = null;
  for (const host of API_HOSTS) {
    try {
      const res = await axios.get(`${host}${path}`, { timeout: API_TIMEOUT_MS });
      return res;
    } catch (err) {
      lastErr = err;
      if (axios.isAxiosError(err)) {
        console.error(`Falha no Host ${host}. Código Axios: ${err.code}. Mensagem: ${err.message}`);
      } else {
        console.error(`Falha no Host ${host}. Erro desconhecido:`, err);
      }
    }
  }
  throw lastErr;
}

async function getTableIdByNumber(tableNumber: string | number): Promise<string | null> {
  const tableRes = await fetchFromAnyHost(`/table/find?number=${tableNumber}`);
  const tableData = tableRes?.data ?? {};
  const foundId = tableData.id ?? tableData.table?.id;
  return foundId ? String(foundId) : null;
}

async function getOrdersByTableId(tableId: string | number): Promise<any[]> {
  const ordersRes = await fetchFromAnyHost(`/table/${tableId}/orders`);
  return ordersRes?.data ?? [];
}

const isBeingDelivered = (order: Order): boolean => {
  return order.status === true || order.status === 'indo até vc';
};

const useActiveOrdersLogic = () => {
  const { tableNumber, tableId } = useTable();
  const [loading, setLoading] = useState(true);
  const [rawOrders, setRawOrders] = useState<Order[]>([]);
  const [hiddenOrderIds, setHiddenOrderIds] = useState<Set<string | number>>(new Set());

  // Lógica de Filtragem de Pedidos ATIVOS
  const activeOrders = useMemo(() => {
    return rawOrders.filter(order =>
      !hiddenOrderIds.has(order.id) &&
      !order.draft &&
      !isBeingDelivered(order)
    );
  }, [rawOrders, hiddenOrderIds]);

  const hasActiveOrders = activeOrders.length > 0;
  const activeCount = activeOrders.length; // Contagem para o badge

  useEffect(() => {
    async function loadOrders() {
      if (!tableNumber && !tableId) {
        setLoading(false);
        return;
      }

      try {
        let currentTableId: string | number | null = tableId;

        if (!currentTableId && tableNumber) {
          currentTableId = await getTableIdByNumber(tableNumber);
        }

        if (!currentTableId) {
          console.error("Mesa não encontrada.");
          return;
        }

        const allOrders = await getOrdersByTableId(currentTableId);
        let shouldHideOrders: (string | number)[] = [];

        const typedOrders: Order[] = (Array.isArray(allOrders) ? allOrders : []).map((order: any) => {
          const typedOrder: Order = {
            items: Array.isArray(order.items) ? order.items : [],
            ...order,
            draft: !!order.draft,
          };

          if (isBeingDelivered(typedOrder) && !typedOrder.draft) {
            shouldHideOrders.push(typedOrder.id);
          }
          return typedOrder;
        }) as Order[];

        if (shouldHideOrders.length > 0) {
          setHiddenOrderIds(prevIds => {
            const newIds = new Set(prevIds);
            shouldHideOrders.forEach(id => newIds.add(id));
            return newIds;
          });
        }
        setRawOrders(typedOrders);
      } catch (err: any) {
        console.error("Erro ao carregar pedidos (execução única):", err);
        setRawOrders([]);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [tableNumber, tableId]); 

  return { loading, hasActiveOrders, activeCount };
};

interface PedidoAtivoFABProps {
  onClose?: () => void;
}

const PedidoAtivoFAB: React.FC<PedidoAtivoFABProps> = ({ onClose }) => {
  const navigation = useNavigation();
  const { hasActiveOrders, loading, activeCount } = useActiveOrdersLogic();

  // Só mostra se tiver pedidos ativos
  if (loading || !hasActiveOrders) {
    return null;
  }

  const handlePress = () => {
    navigation.navigate('StatusPedido' as never);
  };

  return (
    <TouchableOpacity
      style={styles.bellContainer}
      onPress={handlePress}
    >
      {/* Ícone de Sino */}
      <Feather name="bell" size={28} color="#000" />

      {/* Badge com contador */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {activeCount > 9 ? '9+' : activeCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Estilo relativo (não mais absolute) para ficar ao lado da sacola
  bellContainer: {
    marginRight: 15, // Espaço entre o sino e a sacola
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30', // Vermelho vibrante
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FAF6ED', // Mesma cor do fundo da tela para "recortar" a borda
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PedidoAtivoFAB;