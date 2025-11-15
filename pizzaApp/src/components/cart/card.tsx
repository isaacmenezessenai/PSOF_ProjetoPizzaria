import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductProps } from "../dashboard/card";

type CardProps = {
    product: ProductProps;
    quantity: number;
    onEdit: () => void;
    onRemove: () => void;
    onChangeQty: (delta: number) => void;
};

export default function Card({ product, quantity, onEdit, onRemove, onChangeQty }: CardProps) {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: product.banner }} style={styles.image} />

            <View style={styles.infoBox}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
                <Text style={styles.ingredients} numberOfLines={1} ellipsizeMode="tail">{product.description}</Text>
                <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(Number(product.price))}
                </Text>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={{ fontWeight: "bold" }}>Editar</Text>
                    <Ionicons name="arrow-forward" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.qtyBox}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => onChangeQty(-1)}>
                    <Ionicons style={styles.qtyButtonText} name="remove-outline" size={14} color={"#9A1105"} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={() => onChangeQty(1)}>
                    <Ionicons style={styles.qtyButtonText} name="add-outline" size={14} color={"#9A1105"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        borderColor: "#a8a8a8",
        borderWidth: 1,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12
    },
    infoBox: {
        flex: 1,
        paddingLeft: 5
    },
    title: {
        fontSize: 24
    },
    ingredients: {
        fontSize: 12,
        color: "#888"
    },
    price: {
        fontSize: 14,
        marginVertical: 4,
        paddingBottom: 10
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
        gap: 5
    },
    qtyBox: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        margin: 8,
    },
    qtyButton: {
        borderRadius: 6,
        padding: 5,
    },
    qtyButtonText: {
        aspectRatio: 1,
        alignSelf: "center",
    },
    qtyText: {
        fontSize: 20,
        marginHorizontal: 8
    },
    removeButton: {
        marginLeft: 8,
        padding: 6,
        backgroundColor: "#9A1105",
        borderRadius: 6,
    },
});
