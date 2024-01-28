import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import OCRComponent from '../components/OCRComponent';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Camera, CameraType, ImageType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen({ navigation }: any) {
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
      quality: 0,
    });

    
  };

  const takePicture: () => void = async () => {
    if (!cameraRef.current) return;
    let photo = await cameraRef.current.takePictureAsync({
      base64: false,
      quality: 0
    });

    if (!photo) {
      console.log('Photo not captured');
      return;
    }

    const resizedPhoto = await resizeImageToTargetSize(photo.uri, 1024);
    if (!resizedPhoto) {
      console.log('Unable to resize photo under 1024 KB');
      return;
    }

    if (!resizedPhoto.base64) {
      console.log('Base 64 not created');
      return;
    }

    const base64 = resizedPhoto.base64.split(' ').join('+');

    const receiptData = await analyzeReceipt(base64);
    console.log(receiptData);

    try {
      await AsyncStorage.setItem('receiptData', JSON.stringify(receiptData));
      navigation.navigate('SplitScreen')
    } catch (e) {
      console.log('Error saving receipt data to local storage', e);
    }
  };

  const resizeImageToTargetSize = async (uri: string, targetSizeInKB: number) => {
    let compression = 1;
    let width = 800; 
    let base64Length;

    do {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: width } }],
        { compress: compression, format: ImageManipulator.SaveFormat.PNG, base64: true }
      );

      base64Length = Math.ceil((result.base64!!.length * 3) / 4);
      if (base64Length > targetSizeInKB * 1024) {
        if (compression > 0.1) {
          compression -= 0.1; 
        } else {
          width -= 100; 
        }
      } else {
        return result;
      }
    } while (base64Length > targetSizeInKB * 1024);

    return null;
  };


  const analyzeReceipt = async (base64: string) => {
    const url = 'https://api-iota-green.vercel.app/v1/receipt'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'image': base64,
      }),
    };
    const res = await fetch(url, options);
    const { success, data, error } = await res.json();

    if (!success) {
      console.log(error);
      return null;
    };

    return data;
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
