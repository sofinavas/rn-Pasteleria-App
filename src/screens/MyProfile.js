import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../services/shop'
import SubmitButton from '../components/SubmitButton'
import LoadingSpinner from '../components/LoadingSpinner'

const MyProfile = ({navigation}) => {
    const localId = useSelector(state=> state.auth.localId)
    const{data:user, isSucces, isLoading, isError, error} = useGetUserQuery({localId})
    useEffect(()=> {
        if (isSucces)console.log(user)
        if (isError) console.log(error)
    },[isSucces, isError])

    if(isLoading) return<LoadingSpinner/>
  return (
    <KeyboardAvoidingView
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
style= {styles.container}
>
    
      <Image
      source = {user?.image ?
        {uri:user.image}
        :
        require('../../assets/iconos/user.png')//agrego la ruta a la imagen por default                            
      }
      resizeMode='cover'
      style={styles.image}
        />
        <SubmitButton title= "Agregar imagen de perfil" 
        onPress={()=> navigation.navigate('ImageSelector')}
        />
       
    
    </KeyboardAvoidingView>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        marginTop:70,
        alignItems:'center',
        gap:20
    },
    image:{
        width:150,
        height:150
    }
})