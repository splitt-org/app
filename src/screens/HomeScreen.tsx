import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Todo: On press should open camera
function HomeScreen({ navigation }: any ) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('SplitScreen')}
        style={[styles.option, { backgroundColor: '#F64610' }]}>
        <Text style={styles.optionText}>split/IT</Text>
        <Text style={styles.optionTextSmall}>split the bill amongst your party</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.option, { backgroundColor: '#FFFFFF' }]}>
        <Text style={styles.optionTextWhiteBg}>ez/SPLIT</Text>        
        <Text style={styles.optionTextSmallWhiteBg}>equally share the bill amongst your party</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  option: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 34,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  optionTextSmall: {
    fontSize: 18,
    color: 'white',
  },
  optionTextWhiteBg: {
    fontSize: 34,
    color: '#F05221',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  optionTextSmallWhiteBg: {
    fontSize: 18,
    color: '#F05221'
  },
});

export default HomeScreen