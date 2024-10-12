import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../services/shop'
import SubmitButton from '../components/SubmitButton'

const MyProfile = ({navigation}) => {
    const localId = useSelector(state=> state.auth.localId)
    const{data:user, isSucces, isLoading, isError, error} = useGetUserQuery({localId})
    useEffect(()=> {
        if (isSucces)console.log(user)
        if (isError) console.log(error)
    },[isSucces, isError])

    if(isLoading) return<LoadingSpinner/>
  return (
    <View style= {styles.container}>
      <Image
      source = {user.image ?
        {uri:user.image}
        :
        require()//agrego la ruta a la imagen por default                            
      }
      resizeMode='cover'
      style={styles.image}
        />
        <SubmitButton title= "Agregar imagen de perfil" 
        onPress={()=> navigation.navigate('ImageSelector')}
        />
        <SubmitButton title= "Agregar ubicación"
        onPress={()=> navigation.navigate("LocationSelector")}
        />
        <FlatList
        data= {user.locations}
        keyExtractor= {item => item.id}
        renderItem = {({item}) => <View> <Text> {item.address} </Text> </View> }
        />
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        marginTop:70,
        alignItems:'center'
        gap:20
    },
    image:{
        width:150,
        height:150
    }
})