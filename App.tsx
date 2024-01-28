import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Satoshi': require('./assets/fonts/Satoshi-Variable.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  return (
    <View style={styles.container}>
      {fontLoaded ? (
        <Text style={styles.text}>Hello, using Satoshi font!</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Satoshi',
    fontSize: 20,
  },
});
