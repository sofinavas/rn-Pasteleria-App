import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../services/shop';
import SubmitButton from '../components/SubmitButton';
import LoadingSpinner from '../components/LoadingSpinner';

const MyProfile = ({ navigation }) => {
  const localId = useSelector(state => state.auth.localId);
  const { data: user, isSuccess, isLoading, isError, error } = useGetUserQuery({ localId });

  useEffect(() => {
    if (isSuccess) console.log(user);
    if (isError) console.log(error);
  }, [isSuccess, isError]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image
        source={user?.image ? { uri: user.image } : require('../../assets/iconos/user.png')}
        resizeMode='cover'
        style={styles.image}
      />
      <Text style={styles.text}>
        Name: {user?.name || 'N/A'}
      </Text> 
      <Text style={styles.text}>
        Email: {user?.email || 'N/A'}
      </Text> 
      <SubmitButton
        title="Agregar imagen de perfil"
        onPress={() => navigation.navigate('ImageSelector')}
      />
    </KeyboardAvoidingView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: 'center',
    gap: 20
  },
  image: {
    width: 150,
    height: 150
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
