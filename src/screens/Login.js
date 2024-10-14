import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { colors } from '../global/colors'
import { loginSchema } from '../validations/loginSchema'
import { useLoginMutation } from '../services/auth'
import { insertSession } from '../db'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [triggerLogin, { data, isSuccess, isError, error }] = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmit = async () => {
        try {
            loginSchema.validateSync({ email, password })
            const { data } = await triggerLogin({ email, password });
            if (data && data.email && data.idToken && data.localId){
            await insertSession(data)
            dispatch(setUser({
                email: data.email,
                idToken: data.idToken,
                localId: data.localId
            }));
        } else{
                console.error('Error: Invalid response from server');
            }
        } catch (error) {
            console.log(error)
            switch (error.path) {
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
        <View style={styles.main}>
            <View style={styles.container}>
                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    isSecure={false}
                    error={errorEmail}
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error={errorPassword}
                />
                {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}


                <SubmitButton onPress={onSubmit} title='Iniciar Sesión' />
                
                <Text style={styles.sub}>No tenés una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.subLink}>Registro</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: '90%',
        backgroundColor: colors.main,
        gap: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: 20
    },
    title: {
        fontSize: 22,
        fontFamily: 'Lobster'
    },
    sub: {
        fontSize: 14,
        fontFamily: 'Josefin'
    },
    subLink: {
        fontSize: 14,
        fontFamily: "Josefin",
        color: "blue"
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
})
