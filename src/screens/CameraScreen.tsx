import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import OCRComponent from '../components/OCRComponent';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Camera, CameraType, ImageType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const cameraRef = useRef<Camera>(null);

  const toggleCameraType: () => void = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const pickImage: () => void = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  };

  const takePicture: () => void = async () => {
    if (!cameraRef.current) return;
    let { base64 } = await cameraRef.current.takePictureAsync({
      base64: true,
      imageType: ImageType.png,
    });
    if (!base64) {
      console.log('Base 64 not created');
      return;
    }
    base64 = base64.split(' ').join('+');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <OCRComponent type={type} cameraRef={cameraRef}/>
      </View>
      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.cameraGallery} onPress={() => pickImage()}>
          <EntypoIcon name='images' size={35} color={'white'}></EntypoIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraCapture} onPress={() => takePicture()}>
          <View style={styles.cameraOuterCircle}>
            <View style={styles.cameraInnerCircle} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraFlip} onPress={() => toggleCameraType()}>
          <EvilIcons name='refresh' size={50} color={'white'}></EvilIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161515',
  },
  cameraContainer: {
    width: '95%',
    flex: 7,
    marginTop: 50,
  },
  cameraControls: {
    width: '90%',
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -10,
    paddingBottom: 10,
  },
  cameraOuterCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  cameraInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'black',
  },
  cameraCapture: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  cameraGallery: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cameraFlip: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});
