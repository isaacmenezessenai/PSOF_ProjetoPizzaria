import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/App/Dashboard';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen name="Dashboard" component={Dashboard} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;