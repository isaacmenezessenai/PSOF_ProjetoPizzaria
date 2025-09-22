// src/pages/App/Dashboard.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
//import Header from '../../components/Menu/Header'; 
import { ProductCard } from '../../components/Menu/ProductCard';

const Dashboard: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View>

            </View> 
            
        </ScrollView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF6ED',
    },
});



