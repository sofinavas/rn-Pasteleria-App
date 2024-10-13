import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import cart from "../data/cart.json";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shop";
import { clearCart } from "../features/cart/cartSlice";
import { colors } from "../global/colors";

const Cart = ({navigation}) => {
const cart= useSelector(state => state.cart)
const localId = useSelector(state.auth.localId)
const [triggerPostOrder] = usePostOrderMutation()
const dispatch =useDispatch()

const handleAddOrder = () => {
  const createdAt = new Date().toLocaleString()
  const order= {
    ...cart,
    createdAt
  }
  triggerPostOrder({localId,order})
  dispatch(clearCart())
  navigation.navigate('OrdersStack')
}
if (cart.total === 0) return <View><Text>El carrito está vacío</Text></View>

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.containerConfirm}>
    <Pressable onPress={handleAddOrder} >
      <Text style= {styles.textConfirm} >Confirmar</Text>

    </Pressable>

     
        <Text style={styles.textConfirm}>Total: $ {cart.total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container:{
    justifyContent:"space-between",
    flex:1
  },
  containerConfirm:{
    backgroundColor: colors.mainDark,
    padding: 20,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  textConfirm:{
    color: colors.greyDark,
    fontSize:20
  }
});
