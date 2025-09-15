import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import type { Category } from "../types";

type Props = {
  categories: Category[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
};

export const CategoryChips: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 4 }}
        renderItem={({ item }) => {
          const selected = item.id === selectedId;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item.id)}
              style={[styles.chip, selected ? styles.chipActive : undefined]}
            >
              <Text style={[styles.text, selected ? styles.textActive : undefined]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
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
