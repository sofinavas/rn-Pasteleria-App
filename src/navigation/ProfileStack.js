import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, } from 'react-native'
import Header from '../components/Header'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'
import ProfileImage from '../screens/ProfileImage'
const Stack= createNativeStackNavigator()


const ProfileStack = () => {
  return (

    <Stack.Navigator 
        screenOptions= {(
            ()=>{
                return{
                    header: ()=> <Header title= 'Perfil' />
                }
            }
        )}
    >
        <Stack.Screen name = 'MyProfile' component= {MyProfile}/>
        <Stack.Screen name = 'ImageSelector' component= {ImageSelector}/>
        <Stack.Screen name='ProfileImage' component={ProfileImage } />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})