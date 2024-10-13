import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useGetOrderByUserQuery } from '../services/shop'


const OrderDetail = ({route}) => {

    const {id} = route.params
    const localId = useSelector(state => state.auth.localId)
    const {data: order, isSucces  } = useGetOrderByUserQuery({localId, orderId: id})

    useEffect(() => {
        if (isSucces) console.log(order)
    }, [isSucces])
  return (
    <View>
      <Text>OrderDetail</Text>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({})