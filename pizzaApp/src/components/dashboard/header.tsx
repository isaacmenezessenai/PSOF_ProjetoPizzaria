import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTable } from "../../contexts/TableContext";

export default function Header() {
    const { tableNumber } = useTable();

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../../../assets/img/header.png")}
                    style={{ width: 250, height: 100*1.25, resizeMode: "contain" }}
                />
            </View>
            {tableNumber && (
                <View style={styles.table}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, fontFamily: "FactorA", textAlign: "center", color: "#fff", marginBottom: -4 }}>
                            Mesa
                        </Text>
                        <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "NeueHaas", textAlign: "center", color: "#fff" }}>
                            {tableNumber}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    table: {
        width: 60,
        height: 65,
        backgroundColor: "#9A1105",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    }
});