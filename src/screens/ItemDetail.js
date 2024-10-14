import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { addItemCart } from "../features/cart/cartSlice.js"; //es la funcion que cree y necesito el dispatch para poider usarla
import { useDispatch } from "react-redux";
import {useNavigation} from '@react-navigation/native';
import { useGetProductQuery } from "../services/shop.js";
import { colors } from "../global/colors.js";


const ItemDetail = ({ route }) => {
  const { id } = route.params
  const {data: product, isLoading} =useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()

 const handleAddItemCart = () => { //creo una fn para agregar items al cart
  dispatch(addItemCart({...product, quantity:1}))// le agrego un objeto que contenga todo lo que tiene el producto + la cantidad
  navigation.navigate("CartStack") // una vez que agrego el prod, navego a CartStack para ver el prod en el carrito.
 }
 if (isLoading) return <LoadingSpinner/>

  return (
    <View style={styles.container}>
      <Header title="Detalle" />
      <ShadowWrapper style={styles.containerDetail}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: product.thumbnail }} // Use product.thumbnail
        />
        <View style={styles.containerText}>
          <Text style={styles.title}>{product.title} </Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Precio:   ${product.price}</Text>
          <Text style={styles.rating}>Rating:  {product.rating}</Text>
        </View>
        <ShadowWrapper style={styles.containerButton}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Comprar</Text>
          </Pressable>
        </ShadowWrapper>
      </ShadowWrapper>
    </View>
  );
};

export default ItemDetail;

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
