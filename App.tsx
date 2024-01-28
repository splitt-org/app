import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SplitScreen from './src/screens/SplitScreen';
import EZSplitScreen from './src/screens/EZSplitScreen';
import PartyNumberScreen from './src/screens/PartyNumberScreen.';
import TotalBill from './src/screens/TotalBill';
import EZSplitFinalScreen from './src/screens/EZSplitFinalScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Satoshi: require('./assets/fonts/Satoshi-Variable.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {fontLoaded ? (
          <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SplitScreen'
              component={SplitScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='CameraScreen'
              component={CameraScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EZSplitScreen'
              component={EZSplitScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='PartyNumberScreen'
              component={PartyNumberScreen}
              options={{ headerShown: false }}
              initialParams={{partyNum: 2}}
            />
            <Stack.Screen
              name='TotalBill'
              component={TotalBill}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EZSplitFinalScreen'
              component={EZSplitFinalScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Text>Loading...</Text>
        )}
        <StatusBar style='auto' />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
