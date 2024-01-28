import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function EZSplitFinalScreen({ route, navigation }: any) {
  const finalPrice = Math.round(route.params.finalPrice * 100) / 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
      <Text style={styles.titleText}>Everyone will pay</Text>
      <Text style={styles.largeTitleText}> ${finalPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 200,
  },
  titleText: {
    marginTop: 100,
    fontSize: 36,
    color: 'white',
    fontWeight: '400',
  },
  largeTitleText: {
    fontSize: 96,
    color: 'white',
    fontWeight: '400',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '300%',
  },
});
