import React, { ReactElement } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export interface TabBarItem {
  label: string;
  icon: ReactElement;
  screen: string;
}

const TABS: TabBarItem[] = [
  { label: "Favorites", icon: <Ionicons name="star" size={24} color="#888" />, screen: "FavoritesScreen" },
  { label: "List", icon: <FontAwesome5 name="clipboard-list" size={24} color="#888" />, screen: "ListScreen" },
  { label: "QR", icon: <Ionicons name="qr-code-outline" size={30} color="#888" />, screen: "QrCodeScreen" },
  { label: "Hat", icon: <FontAwesome5 name="hat-wizard" size={24} color="#888" />, screen: "HatScreen" },
  { label: "Profile", icon: <Ionicons name="person-outline" size={24} color="#888" />, screen: "ProfileScreen" },
];

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]; // 👈 corrigido aqui
        const isFocused = state.index === index;
        const isMiddleButton = index === Math.floor(state.routes.length / 2);

        const item = TABS.find((tab) => tab.screen === route.name);
        if (!item) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconColor = isFocused ? "#fff" : "#888";
        const labelStyle = [styles.label, isFocused && styles.activeLabel];

        // 👇 aqui o cast resolve o erro do TS
        const renderIcon = React.cloneElement(item.icon as ReactElement<any>, {
          color: iconColor,
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabBarItem}
          >
            <View style={isMiddleButton && styles.tabBarButton}>{renderIcon}</View>
            {!isMiddleButton && <Text style={labelStyle}>{item.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: 60,
    borderTopWidth: 0,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DAA520",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  activeLabel: {
    color: "#fff",
  },
});
