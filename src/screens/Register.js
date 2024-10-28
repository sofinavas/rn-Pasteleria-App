import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { colors } from '../global/colors'
import { registerSchema } from '../validations/registerSchema'
import { useRegisterMutation } from '../services/auth'

const Register = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [triggerRegister, {data,isSucces}] = useRegisterMutation()
    const dispatch = useDispatch()

    const onSubmit = async()=> {
        try {
            registerSchema.validateSync({email, password, confirmPassword})
            const {data} = await triggerRegister({email, password})
           
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
                    setErrorConfirmPassword('')
                    break
                case 'password':
                    setErrorPassword(error.message)
                    setErrorEmail('')
                    setErrorConfirmPassword('')
                    break
                    case 'confirmPassword':
                        
                        setErrorEmail('')
                        setErrorPassword("")
                        setErrorConfirmPassword(error.message)
                        break
                 
            }
            
        }
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
style= {styles.main}>
   
     
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
              <InputForm
            label="Confirmar Password"
            value={confirmPassword}
            onChangeText={(t)=> setConfirmPassword(t)}
            isSecure={true}
            error={errorConfirmPassword}
            />
        <SubmitButton onPress={onSubmit} title='Registrarme'/>
         <Text style={styles.sub}>Ya tenés una cuenta?</Text>
         <Pressable onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.subLink}>Inicio de sesion</Text>
         </Pressable>
        </View>
     
        </KeyboardAvoidingView>
  )
}

export default Register

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