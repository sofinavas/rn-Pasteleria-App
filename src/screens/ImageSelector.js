import { StyleSheet, Text, View, Image } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { usePatchImageProfileMutation } from '../services/shop';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [triggerAddImageProfile] = usePatchImageProfileMutation();
  const localId = useSelector(state => state.auth.localId);

  const pickImageFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      aspect: [9, 9],
      quality: 0.1,
      base64: true,
      allowsEditing: true       
    });

    if (result.canceled || !result.assets || !result.assets[0].base64) return;
   
    setImage('data:image/jpg;base64,' + result.assets[0].base64);
  };

  const pickImageFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [9, 9],
      quality: 0.1,
      base64: true,
      allowsEditing: true
    });

    if (result.canceled) return;
    console.log(result);
    setImage('data:image/jpg;base64,' + result.assets[0].base64);
  };
  const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = firebase.storage().ref().child(`profile_images/${localId}.jpg`);
    await storageRef.put(blob);
    return await storageRef.getDownloadURL();
  };
  

  const confirmImage = async () => {
    if (!image) return; // Ensure an image is selected
    const imageUrl = await uploadImage(image);
    triggerAddImageProfile({ image: imageUrl, localId });
    navigation.navigate("ProfileImage");
  };
  

  

  return (
    <View style={styles.container}>
    <Image
  source={image ? { uri: image } : require('../../assets/iconos/user.png')}
  resizeMode='cover'
  style={styles.image}
/>

      <SubmitButton title='Tomar Imagen' onPress={pickImageFromCamera} />
      <SubmitButton title='Seleccionar desde Galería' onPress={pickImageFromGallery} />
      <SubmitButton title='Confirmar' onPress={confirmImage} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: "center",
    gap: 20
  },
  image: {
    width: 150,
    height: 150
  }
});
