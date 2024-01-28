import { Camera, CameraType, ImageType } from 'expo-camera';
import { RefObject, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

export default function OCRComponent({ type, cameraRef }: { type: CameraType, cameraRef: RefObject<Camera> }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
