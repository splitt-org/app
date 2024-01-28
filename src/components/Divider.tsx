import {
    StyleSheet,
    View,
  } from "react-native";

function Divider() {
  return (
    <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: '88%',
      paddingBottom: 10,
      paddingTop: 10,
      alignSelf: 'center'
    }}/>
  )
}

export default Divider