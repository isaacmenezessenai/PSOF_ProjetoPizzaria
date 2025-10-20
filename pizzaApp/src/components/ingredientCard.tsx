import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { AxiosInstance } from "axios";

export type ExtraIngredient = {
  id: string;
  name: string;
  price: string;
};

export type SelectedExtra = {
  id: string;
  name: string;
  price: string;
  amount: number;
};

interface Props {
  api: AxiosInstance;
  onChange: (extras: SelectedExtra[]) => void;
  initialExtras?: SelectedExtra[];
}

export function ExtraIngredientsSelector({ api, onChange, initialExtras = [] }: Props) {
  const [availableExtras, setAvailableExtras] = useState<ExtraIngredient[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>(initialExtras);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExtras() {
      try {
        setLoading(true);
        setError(null);
        // Rota definida em routes.ts
        const response = await api.get("/ingredients/extra"); 
        setAvailableExtras(response.data);
      } catch (err) {
        console.error("Erro ao buscar extras", err);
        setError("Não foi possível carregar os adicionais.");
      } finally {
        setLoading(false);
      }
    }
    fetchExtras();
  }, [api]);

  useEffect(() => {
    onChange(selectedExtras);
  }, [selectedExtras, onChange]);

  const handleChangeAmount = (extra: ExtraIngredient, newAmount: number) => {
    setSelectedExtras((prevExtras) => {
      if (newAmount <= 0) {
        return prevExtras.filter((e) => e.id !== extra.id);
      }

      const existingExtra = prevExtras.find((e) => e.id === extra.id);

      if (existingExtra) {
        return prevExtras.map((e) =>
          e.id === extra.id ? { ...e, amount: newAmount } : e
        );
      } else {
        return [
          ...prevExtras,
          { id: extra.id, name: extra.name, price: extra.price, amount: newAmount },
        ];
      }
    });
  };

  const renderExtraItem = ({ item }: { item: ExtraIngredient }) => {
    const currentAmount =
      selectedExtras.find((e) => e.id === item.id)?.amount || 0;

    return (
      <View style={styles.extraItemContainer}>
        <View>
          <Text style={styles.extraName}>{item.name}</Text>
          <Text style={styles.extraPrice}>
            + R$ {parseFloat(item.price).toFixed(2)}
          </Text>
        </View>
        <View style={styles.qtyBox}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleChangeAmount(item, currentAmount - 1)}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{currentAmount}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleChangeAmount(item, currentAmount + 1)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="small" color="#000" style={{ marginVertical: 20 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Adicionais</Text>
      <FlatList
        data={availableExtras}
        renderItem={renderExtraItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  extraItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  extraName: {
    fontSize: 16,
    color: "#444",
  },
  extraPrice: {
    fontSize: 14,
    color: "#888",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  qtyButtonText: {
    color: "#fff",
    fontSize: 22,
  },
  qtyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 10,
  }
});