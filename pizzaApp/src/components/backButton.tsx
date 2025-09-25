import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ style }: { style?: any }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerRow, style]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#222" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingLeft: 10,
    backgroundColor: "#FAF6ED",
  },
  backButton: {
    padding: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
});

export default BackButton;