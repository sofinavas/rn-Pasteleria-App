import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { addItemCart } from "../features/cart/cartSlice.js"; //es la funcion que cree y necesito el dispatch para poider usarla
import { useDispatch } from "react-redux";
import {useNavigation} from '@react-navigation/native';
import { useGetProductQuery } from "../services/shop.js";
import { colors } from "../global/colors.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

import {useEffect, useState} from 'react'

const ItemDetail = ({ route }) => {
  const { id } = route.params
  const {data: apiResponse, isLoading, isSuccess, isError, error} =useGetProductQuery(id)
  const [product, setProduct] = useState(null)
  const navigation = useNavigation()
  const dispatch = useDispatch()

 const handleAddItemCart = () => { //creo una fn para agregar items al cart
  if (product){
    dispatch(addItemCart({...product, quantity:1}))// le agrego un objeto que contenga todo lo que tiene el producto + la cantidad
  navigation.navigate("CartStack") // una vez que agrego el prod, navego a CartStack para ver el prod en el carrito.
 }
  }
  useEffect(() => {
    if (isSuccess){
      console.log('API Response:', apiResponse)

      const productData = apiResponse?.product || apiResponse?.items?.[0] || apiResponse;
      setProduct(productData);
    } else if (isError){
      console.error('Error fetching product', error);
    }
  }, [apiResponse, isSuccess, isError])

   // Mostrar un mensaje de error si no se encuentra el producto
   if (!product && isSuccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado.</Text>
      </View>
    );
  }
  
 if (isLoading) return <LoadingSpinner/>


  return (
    <View style={styles.container}>
      <View style = {styles.containerDetail}>
        <View style={styles.imageContainer}>
              {product?.thumbnail ? (
              <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: product.thumbnail }}
              />
              ) : (
              <Text style={styles.noImageText}>No hay imagen disponible</Text>
                )}
        </View>

        <View style= {styles.containerText}>
      
          <Text style={styles.title}>{product.title} </Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Precio:   ${product.price}</Text>
         
        </View>
        
          <Pressable style={styles.button} onPress={handleAddItemCart}>
            <Text style={styles.buttonText}>Comprar</Text>
          </Pressable>
      
    </View>
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
