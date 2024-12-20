import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Search from '../components/Search';
import ProductItem from "../components/ProductItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetProductsQuery } from "../services/shop";

const ItemListCategories = ({ route }) => {
  const { category } = route.params;
  
  
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery(category);
  
  console.log("Products: ", products);

  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    console.log("isSuccess:", isSuccess);
    console.log("products:", products);
    if (isSuccess && products) {
      setProductsFiltered(products);
    }
  }, [category, isSuccess]);

  const onSearch = (input) => {
    if (input) {
      setProductsFiltered(productsFiltered.filter((product) => product.title.includes(input)));
    } else {
      setProductsFiltered(products);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    console.error("Error al obtener productos:", error);
    return <View><Text>Error: {error.message}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Search onSearch={onSearch} />
      <FlatList
        data={productsFiltered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
};


export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
