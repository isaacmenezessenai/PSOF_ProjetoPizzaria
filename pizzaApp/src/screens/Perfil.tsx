// import React from "react";
// import { View, Text } from "react-native";
// import BackButton from "../components/backButton";

// export default function Favoritos() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <BackButton />
//       <Text>Página Perfil</Text>
//     </View>
//   );
// }

import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  TextInput,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/backButton";
import Divider from "../components/divider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootStackParamList";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

// Cores do design
const ACCENT = "#c98917";
const BG = "#f6efe7";
const CARD_BG = "#fff";
const DARK = "#171717";

const PAYMENT_METHODS = [
  { key: "credit", label: "Cartão de Crédito" },
  { key: "debit", label: "Cartão de Débito" },
  { key: "pix", label: "Pix" },
  { key: "cash", label: "Dinheiro" },
];


export default function Checkout({ route, navigation }: Props) {
  const { orderId } = route.params;
  const { setItems } = useCart();
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardPassword, setCardPassword] = useState("");
  const [cardName, setCardName] = useState("");
  const [installments, setInstallments] = useState(1)

  const [selected, setSelected] = useState("credit");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMethod, setModalMethod] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  // Exemplo de itens mockados
  const items = useMemo(
    () => [
      { id: "1", name: "Coxinha + Suco", price: 8.5 },
      { id: "2", name: "Pastel", price: 4.73 },
    ],
    []
  );

  const subtotal = items.reduce((s, it) => s + it.price, 0);
  const total = subtotal;
  const formattedTotal = `R$ ${total.toFixed(2).replace(".", ",")}`;

async function handlePayment() {
  try {
    setLoading(true);
    const paymentTypeMap: Record<string, string> = {
      debit: "1",
      pix: "2",
      credit: "3",
      cash: "4",
    };

    const paymentType = paymentTypeMap[selected] || "1";

    const response = await api.post("/payment", {
      orderId,
      paymentType,
      cardNumber,
      cardPassword,
      cardName,
      installments,
    });

    // trata resposta
    const data = response.data;
    Alert.alert("Pagamento", data.message || "Pagamento realizado com sucesso!");

    if (data.pixCode) {
      console.log("PIX:", data.pixCode);
    }

    // opcional: limpa carrinho e volta à tela de status
    setItems([]);
    closeModal();
    navigation.navigate("StatusPedido", { draft: false, status: false });
  } catch (error: any) {
    console.error(error);
    const msg =
      error.response?.data?.error ?? "Não foi possível processar o pagamento.";
    Alert.alert("Erro", msg);
  } finally {
    setLoading(false);
  }
}


  /** Animações e abertura do modal */
  function openModalFor(method: any) {
    setModalMethod(method);
    setModalVisible(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }

  function closeModal() {
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setModalMethod(null);
    });
  }

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const opacity = anim;

  /** Conteúdo do modal */
  const renderModalContent = () => {
    if (!modalMethod) return null;

    switch (modalMethod.key) {
      case "1":
      case "3":
        return (
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <Text style={styles.formSectionTitle}>Informações do Cartão</Text>
            <TextInput
              style={styles.input}
              placeholder="Número do cartão"
              keyboardType="numeric"
              value = {cardNumber}
              onChangeText={setCardNumber}
            />
            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.input, { flex: 0.7 }]}
                placeholder="MM / AA"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, { flex: 0.3 }]}
                placeholder="CVC"
                keyboardType="numeric"
                value = {cardPassword}
                onChangeText={setCardPassword}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nome impresso no cartão"
              value = {cardName}
              onChangeText={setCardName}
            />
          </ScrollView>
        );

      case "2":
        return (
          <View style={styles.modalScrollContent}>
            <Text style={styles.pixInstruction}>
              Após confirmar, um QR Code será gerado para pagamento.
            </Text>
            <View style={styles.pixInfoBox}>
              <Ionicons name="qr-code-outline" size={30} color={ACCENT} />
              <Text style={styles.pixValue}>{formattedTotal}</Text>
              <Text style={styles.pixValueLabel}></Text>
            </View>

            <TouchableOpacity
              style={styles.pixButton}
              onPress={handlePayment}
              disabled={loading}
            >
              <Text style={styles.payNowText}>
                {loading ? "Processando..." : "Gerar QR Code Pix"}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case "4":
        return (
          <View style={styles.modalScrollContent}>
            <Text style={styles.cashInstruction}>
              Pagamento em dinheiro será realizado no balcão.
            </Text>
            <Text style={styles.formSectionTitle}>Precisa de troco?</Text>
            <TextInput
              style={styles.input}
              placeholder="Troco para quanto? (Ex: 50,00)"
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handlePayment}
              disabled={loading}
            >
              <Text style={styles.confirmTxt}>
                {loading ? "Processando..." : "Confirmar Pagamento no Balcão"}
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return <Text style={styles.modalScrollContent}>Método não configurado.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Checkout</Text>
        </View>
        <Divider />

        <Text style={styles.label}>Pedido: {orderId}</Text>

        <View style={styles.paymentList}>
          {PAYMENT_METHODS.map((m) => {
            const isSelected = selected === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                onPress={() => setSelected(m.key)}
                activeOpacity={0.7}
                style={styles.paymentRow}
              >
                <View style={styles.paymentLeft}>
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && { borderColor: ACCENT },
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text
                    style={[
                      styles.paymentLabel,
                      isSelected && { color: DARK, fontWeight: "700" },
                    ]}
                  >
                    {m.label}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => openModalFor(m)}
                  style={[
                    styles.moreBtn,
                    isSelected && { backgroundColor: ACCENT },
                  ]}
                >
                  <Text
                    style={[
                      styles.moreBtnText,
                      isSelected && { color: "#fff" },
                    ]}
                  >
                    Detalhes
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.summary}>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>
              <Text>R$ {subtotal.toFixed(2).replace(".", ",")}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ fontWeight: "700" }}>Total</Text>
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                {formattedTotal}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.payNow,
              { backgroundColor: selected ? ACCENT : "#ccc" },
            ]}
            activeOpacity={0.85}
            onPress={() =>
              openModalFor(PAYMENT_METHODS.find((p) => p.key === selected))
            }
          >
            <Text style={styles.payNowText}>
              Pagar Agora ({formattedTotal})
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="none"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackdrop}>
            <Animated.View
              style={[
                styles.modalCard,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {modalMethod ? modalMethod.label : "Pagamento"}
                </Text>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close" size={24} color={DARK} />
                </TouchableOpacity>
              </View>

              {renderModalContent()}

              {(modalMethod &&
                (modalMethod.key === "credit" ||
                  modalMethod.key === "debit")) && (
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handlePayment}
                    disabled={loading}
                  >
                    <Text style={styles.confirmTxt}>
                      {loading ? "Processando..." : `Pagar ${formattedTotal}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

/* ---- ESTILOS (idênticos ao layout original, só removi duplicações) ---- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginTop: 8, flexDirection: "row", alignItems: "center" },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: DARK,
    marginRight: 32,
  },
  label: { fontSize: 18, marginTop: 12, marginBottom: 16 },
  paymentList: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: CARD_BG,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentLeft: { flexDirection: "row", alignItems: "center" },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACCENT,
  },
  paymentLabel: { marginLeft: 12, fontSize: 16 },
  moreBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ACCENT,
    backgroundColor: "#fff",
  },
  moreBtnText: { color: ACCENT, fontWeight: "700", fontSize: 12 },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? 18 : 30,
  },
  summary: { width: "100%", paddingVertical: 12, paddingHorizontal: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: DARK,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingRight: 6,
  },
  payNow: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    marginTop: 15,
  },
  payNowText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  /* MODAL */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: CARD_BG,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: DARK },
  modalScrollContent: { padding: 16 },

  // Inputs
  formSectionTitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  rowInputs: { flexDirection: "row", gap: 8, marginBottom: 10 },

  // PIX
  pixInstruction: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
    color: DARK,
  },
  pixInfoBox: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },
  pixValue: { fontSize: 28, fontWeight: "700", color: ACCENT, marginTop: 10 },
  pixValueLabel: { fontSize: 14, color: "#666" },
  pixButton: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  // Dinheiro
  cashInstruction: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fffbe6",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT,
    color: DARK,
  },

  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  confirmBtn: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

