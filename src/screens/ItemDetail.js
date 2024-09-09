import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Header from "../components/Header.js";
import products from "../data/products.json";
import { colors } from "../global/colors.js";
import ShadowWrapper from "../components/ShadowWrapper.js";

const ItemDetail = ({ route }) => {
  const { id } = route.params;

  // Find the product object using the id
  const product = products.find((item) => item.id === id);

  // Check if the product was found
  if (!product) {
    // Handle the case where the product is not found
    console.error("Product not found");
    return null; // Or display an error message
  }

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
