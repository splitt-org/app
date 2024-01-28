import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';

export default function PartyNumberScreen({ route, navigation }: any) {
  const partyNum = route.params.partyNum;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => fadeIn(), []);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimBottom, {
      toValue: 1,
      duration: 1500,
      delay: 1250,
      useNativeDriver: true,
    }).start();
  };

  setTimeout(() => {
    navigation.navigate('TotalBill', { partyNum: partyNum }); //this.props.navigation.navigate('Login')
  }, 3000);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
      <Animated.Text style={[styles.titleText, { opacity: fadeAnim }]}>
        {partyNum} in your party?
      </Animated.Text>
      <Animated.Text style={[styles.titleText, { opacity: fadeAnimBottom }]}>
        Got it...
      </Animated.Text>
      <ActivityIndicator style={styles.loader} size='large' color='white' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
  },
  loader: {
    marginTop: 70,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '300%',
  },
});
