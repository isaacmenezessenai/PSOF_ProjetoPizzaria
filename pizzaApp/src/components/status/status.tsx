import React from "react";
import { View, Text } from "react-native";

type OrderStatusProps = {
  status: boolean; // true = preparando, false = indo até você
};

export default function OrderStatus({ status }: OrderStatusProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2, // sombra Android
        shadowColor: "#000", // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {status ? (
        <>
          {/* Preparando centralizado */}
          <Text
            style={{
              color: "#10191F",
              fontSize: 28,
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
            }}
          >
            Preparando
          </Text>
          <Text
            style={{
              color: "#9E9E9E",
              fontSize: 16,
              fontWeight: "600",
              textAlign: "right",
              width: 120,
            }}
          >
            Indo até você
          </Text>
        </>
      ) : (
        <>
          <Text
            style={{
              color: "#9E9E9E",
              fontSize: 16,
              fontWeight: "600",
              textAlign: "left",
              width: 120,
            }}
          >
            Preparando
          </Text>
          {/* Indo até você centralizado */}
          <Text
            style={{
              color: "#10191F",
              fontSize: 28,
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
            }}
          >
            Indo até você
          </Text>
        </>
      )}
    </View>
  );
}
