import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { Slider } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EZSplitScreen({ navigation }: any) {
  const [value, setValue] = useState(2);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F64610', '#FF683A']}
        style={styles.background}
      />
      <View style={styles.topPanel}>
        <Text style={styles.topText}>How many people are in your party?</Text>
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.sliderPanel}>
          <View style={styles.sliderLabel}>
            <View style={styles.sliderLabelHorz}>
              <View style={styles.sliderNumberBox}>
                <Text style={styles.sliderNumber}>{value}</Text>
              </View>
              <Text style={styles.sliderNumberLabel}>People</Text>
            </View>
          </View>
          <View style={[styles.contentView]}>
            <Slider
              value={value}
              onValueChange={setValue}
              maximumValue={10}
              minimumValue={2}
              minimumTrackTintColor='#FFDBD0'
              maximumTrackTintColor='#DCDCDC'
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: 'transparent' }}
              thumbStyle={{
                height: 30,
                width: 30,
                backgroundColor: 'transparent',
              }}
              thumbProps={{
                children: (
                  <MaterialCommunityIcons
                    name='square-rounded'
                    size={30}
                    color='#F05221'
                  />
                ),
              }}
            />
            <View style={styles.actionItems}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.actionItemText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton}
                onPress={() => navigation.navigate('PartyNumberScreen', {partyNum: value})}
                >
                <Text style={styles.actionItemTextConfirm}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  topPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 5,
  },
  topText: {
    fontSize: 30,
    paddingBottom: 60,
    paddingHorizontal: 70,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  bottomPanel: {
    paddingTop: 100,
    display: 'flex',
    alignItems: 'center',
    flex: 7,
  },
  sliderPanel: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sliderNumberBox: {
    borderColor: '#0000004A',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 7,
  },
  sliderNumber: {
    fontSize: 20,
    fontWeight: '500',
  },
  sliderNumberLabel: {
    fontWeight: '500',
    fontSize: 20,
  },
  sliderLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '25%',
  },
  sliderLabelHorz: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  contentView: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  actionItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: '65%',
  },
  actionItemText: {
    fontWeight: '400',
    fontSize: 16,
  },
  actionItemTextConfirm: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
  },
  cancelButton: {
    borderColor: '#F05221',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#F05221',
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: 4,
  },
});
