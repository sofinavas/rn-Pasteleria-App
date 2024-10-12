import { Pressable, StyleSheet, Text, View } from 'react-native'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { colors } from '../global/colors'
import { loginSchema } from '../validations/loginSchema'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [triggerLogin, {data,isSucces, isError, error}] = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmit = async()=> {
        try {
            loginSchema.validateSync({email, password})
            const {data} = await triggerLogin({email, password})
            insertSession(data)
            dispatch(setUser({
                email: data.email,
                idToken:data.idToken,
                localId:data.localId
            }))
        } catch (error) {
            console.log(error)
            switch(error.path){
                case 'email':
                    setErrorEmail(error.message)
                    setErrorPassword('')
                    break
                case 'password':
                    setErrorPassword(error.message)
                    setErrorEmail('')
                    break
                default:
                    break    
            }
            
        }
    }

  return (
    <View style= {styles.main}>
        <View style= {styles.container}>
            <InputForm
            label="Email"
            value={email}
            onChangeText={(t)=> setEmail(t)}
            isSecure={false}
            error={errorEmail}
            />
            <InputForm
            label="Password"
            value={password}
            onChangeText={(t)=> setPassword(t)}
            isSecure={true}
            error={errorPassword}
            />
        <SubmitButton onPress={onSubmit} title='Iniciar Sesión'/>
         <Text style={styles.sub}>No tenés una cuenta?</Text>
         <Pressable onPress={()=> navigation.navigate('Register')}>
            <Text style={styles.subLink}>Registro</Text>
         </Pressable>
        </View>
     
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        width:'90%',
        backgroundColor: colors.main,
        gap:15,
        borderRadius:10,
        justifyContent:"center",
        alignItems:'center',
        paddingVertical:20
    },
    title:{
        fontSize:22,
        fontFamily:'Lobster'
    },
    sub:{
        fontSize:14,
        fontFamily:'Josefin'
    },
    subLink:{
        fontSize:14,
        fontFamily:"Josefin",
        color:"blue"
    }
})