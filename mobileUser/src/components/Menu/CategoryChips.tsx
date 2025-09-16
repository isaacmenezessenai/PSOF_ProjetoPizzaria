import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import type { Category } from "../../types";

type Props = {
    categories: Category[];
    selectedId?: string | null;
    onSelect: (id: string) => void;
};



const styles = StyleSheet.create({
    wrapper: { marginBottom: 12 },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EEE",
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: "#9A1105",
    },
    text: { color: "#222", fontWeight: "600" },
    textActive: { color: "#fff" },
});
