// DIVISÓRIA

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Chunko': require('./src/assets/fonts/chunko-bold-demo.regular.ttf'),
        'Neuehaas': require('./src/assets/fonts/NeueHaasDisplayRoman.ttf'),
        'Factora': require('./src/assets/fonts/TRIALFactorA-Bold35-BF6476bc2fd89dd.otf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />; // apenas uma tela em branco enquanto carrega
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Factora', fontSize: 24 }}>
      Testando fonte sem AppLoading!
      </Text>
      <Text style={{ fontFamily: 'Neuehaas', fontSize: 24 }}>
      Testando fonte sem AppLoading!
      </Text>
      <Text style={{ fontFamily: 'Chunko', fontSize: 24 }}>
      Testando fonte sem AppLoading!
      </Text>
    </View>
  );
}