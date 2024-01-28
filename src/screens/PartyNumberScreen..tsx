import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function PartyNumberScreen({ route, navigation }: any) {
  const partyNum = route.params.partyNum;

  setTimeout(() => {
    navigation.navigate('TotalBill', {partyNum: partyNum}); //this.props.navigation.navigate('Login')
}, 1000);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
      <Text style={styles.titleText}>{partyNum} in your party?</Text>
      <Text style={styles.titleText}>Got it...</Text>
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
    paddingBottom: 200,
  },
  titleText: {
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
  },
  loader: {
    marginTop: 70
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '300%',
  },
});
