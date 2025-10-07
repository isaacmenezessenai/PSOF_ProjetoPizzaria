import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTable } from "../contexts/TableContext";
import { useCart } from "../contexts/CartContext";
import { api } from "../services/api";

type RootStackParamList = {
  QRCode: undefined;
  Sacola: undefined;
  Home: { table_id: string };
  DetalhesProduto: { product: any };
};

type QRCodeScreenProp = StackNavigationProp<RootStackParamList, "QRCode">;

export default function QRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<QRCodeScreenProp>();
  const { setTableNumber } = useTable();
  const { pendingProduct, setPendingProduct, items, setItems } = useCart();

  if (!permission) {
    return <View style={styles.center}><Text>Carregando permissões...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", marginBottom: 12, fontSize: 18, fontFamily: "NeueHaas" }}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={{ paddingHorizontal: 30, paddingVertical: 12, backgroundColor: "#9A1105", borderRadius: 20, }}>
          <Text style={{ fontFamily: "NeueHaas", color: "white", fontSize: 16 }}>
            Conceder permissão
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);

    try {
      // ! tenta transformar em JSON
      const parsed = JSON.parse(data); // ? { tableId: "uuid" }
      if (!parsed?.tableId) {
        Alert.alert("QR inválido", "Não contém um ID de mesa válido.");
        setScanned(false);
        return;
      }

      // ! VALIDAÇÃO
      const response = await api.get(`/tables/${parsed.tableId}/validate`);
      const table = response.data;

      setTableNumber(String(table.number));
      Alert.alert("Mesa vinculada!", `Você está na mesa ${table.number}`);

      // ! NÃO ESQUECE PELO AMOR DE DEUS
      // produto pendente -> sacola

      if (pendingProduct) {
        // Evita duplicidade: soma quantidade se já existe
        const idx = items.findIndex(i => i.product.id === pendingProduct.product.id);
        if (idx !== -1) {
          const newItems = [...items];
          newItems[idx].quantity += pendingProduct.quantity;
          setItems(newItems);
        } else {
          setItems([...items, pendingProduct]);
        }
        setPendingProduct(null);
        navigation.navigate("Sacola");
      } else {
        navigation.navigate("Home", { table_id: parsed.tableId });
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível validar este QR Code.");
      setScanned(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.background}>
          <Text style={styles.title}>Escaneie o QRCode da mesa para fazer o seu pedido</Text>
          <Text style={styles.subtitle}>Levaremos ele até você!</Text>
        </View>
        {scanned && (
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Escanear novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: 280,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "NeueHaas",
    textAlign: "center",
    padding: 10,
  },
  subtitle: {
    color: "#000",
    fontSize: 14,
    fontFamily: "NeueHaas",
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#9A1105",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "NeueHaas",
  },
});
