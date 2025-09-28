import React, { ReactElement } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export interface TabBarItem {
    label: string;
    icon: ReactElement;
    screen: string;
}

const TABS: TabBarItem[] = [
    { label: "Home", icon: <Ionicons name="home-outline" size={20} color="#888" />, screen: "Home" },
    { label: "Favoritos", icon: <Ionicons name="star-outline" size={20} color="#888" />, screen: "Favoritos" },
    { label: "", icon: <Ionicons name="qr-code-outline" size={30} color="#fff" />, screen: "QRCode" },
    { label: "Ajuda", icon: <Ionicons name="help-buoy-outline" size={20} color="#888" />, screen: "Ajuda" },
    { label: "Perfil", icon: <Ionicons name="person-outline" size={20} color="#888" />, screen: "Perfil" },
];

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <SafeAreaView edges={["bottom"]}>
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
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

                const renderIcon = React.cloneElement(item.icon as ReactElement<any>, {
                    color: item.screen === "QRCode" ? "#fff" : iconColor,
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
        </SafeAreaView>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        backgroundColor: "#07091aff",
        height: 70,
        paddingHorizontal: 10,
        marginHorizontal: "5%",
        marginBottom: 10,
        borderRadius: 50,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarButton: {
        width: 65,
        height: 65,
        borderRadius: 1000,
        color: "#FFF",
        backgroundColor: "#DAA520",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -40,
        position: "absolute",
    },
    label: {
        fontSize: 12,
        fontFamily: "NeueHaas",
        color: "#888",
        marginTop: 4,
    },
    activeLabel: {
        color: "#fff",
    },
});
