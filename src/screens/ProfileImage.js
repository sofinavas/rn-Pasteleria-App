import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../services/shop'

const ProfileImage = () => {
    const localId = useSelector(state => state.auth.localId)
    const { data: user } = useGetUserQuery({ localId }) // asumiendo que `useGetUserQuery` está configurado para obtener la imagen

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.image }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
})

export default ProfileImage
