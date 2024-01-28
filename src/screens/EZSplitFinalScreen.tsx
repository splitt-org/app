import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Animated, Easing, TouchableOpacity } from 'react-native';

export default function EZSplitFinalScreen({ route, navigation }: any) {
  const finalPrice = Math.round(route.params.finalPrice * 100) / 100;
  const [price, setPrice] = useState<any>(0);

  const countAnim = useRef(new Animated.Value(0)).current;
  countAnim.addListener(({value}) => {
    setPrice(Math.round(value * 100) / 100)
  })

  useEffect(() => countUp(), []);
  const countUp = () => {
    Animated.timing(countAnim, {
      toValue: finalPrice,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
      <Text style={styles.titleText}>Everyone will pay</Text>
      <Text style={styles.largeTitleText}> ${price}</Text>

      <TouchableOpacity style={styles.done}
            onPress={() => navigation.navigate('HomeScreen')}
            >
          <Text style={styles.actionItemText}>Done</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
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
  done: {
    margin: 50,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 4,
  },
  actionItemText: {
    fontWeight: '400',
    fontSize: 16,
  },
});
