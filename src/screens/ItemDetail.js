import { Image, Pressable, StyleSheet, Text, View} from 'react-native'
import { colors } from '../global/colors'
import { addItemCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetProductQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'
const ItemDetail = ({route}) => {
const {id} = route.params
const {data:product,isLoading} = useGetProductQuery(id) 
const navigation = useNavigation()
const dispatch = useDispatch()
const handleAddItemCart = () => { dispatch(addItemCart({...product,quantity:1})) 
navigation.navigate("CartStack")
}
if(isLoading) return <LoadingSpinner/>


return (
  <View style={styles.container}>
    <View style={styles.containerDetail}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={{ uri: product.thumbnail }}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Precio: $ {product.price} </Text>
      </View>
      <Pressable style={styles.button} onPress={handleAddItemCart}>
        <Text style={styles.buttonText}>Comprar</Text>
      </Pressable>
    </View>
  </View>
);
};
export default ItemDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLight,
  },
  containerDetail: {
    backgroundColor: colors.whiteTransparentLight,
    marginTop: 60,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "left",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Playwright",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "MontserratLight",
    paddingTop: 10,
  },
  containerText: {
    padding: 10,
    alignItems: "left",
    with: "80%",
  },
  price: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    padding: 10,
  },
  rating: {
    fontSize: 16,
  },
  containerButton: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "left",
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.fucsia,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: colors.whiteTransparent,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "MontserratBold",
  },
});
