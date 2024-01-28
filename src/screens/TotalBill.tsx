import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

export default function TotalBill({ route, navigation }: any) {
  const [text, onChangeText] = React.useState('0');
  const partyNum = route.params.partyNum;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>
            What is the total bill including tip?
          </Text>
          <View style={styles.paymentText}>
            <Text style={styles.largeSymbol}>$</Text>
            <TextInput
              onChangeText={onChangeText}
              style={styles.input}
              value={text}
              keyboardType='numeric'
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.actionItems}>
        <TouchableOpacity style={styles.cancelButton}
            onPress={() => navigation.navigate('HomeScreen')}
            >
          <Text style={styles.actionItemText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}
            onPress={() => navigation.navigate('EZSplitFinalScreen', {finalPrice: Number(text) / partyNum})}
            >
          <Text style={styles.actionItemTextConfirm}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    fontWeight: '400',
  },
  largeSymbol: {
    fontSize: 96,
    color: 'white',
    fontWeight: '400',
  },
  input: {
    fontSize: 96,
    color: 'white',
  },
  paymentText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -10,
    zIndex: -1,
    height: '150%',
  },
  actionItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '8%',
    top: -100
  },
  actionItemText: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white'
  },
  actionItemTextConfirm: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F05221',
  },
  cancelButton: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 4,
  },
});
