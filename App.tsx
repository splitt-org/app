import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

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
    <NavigationContainer>
    <View style={styles.container}>
      {fontLoaded ? (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
