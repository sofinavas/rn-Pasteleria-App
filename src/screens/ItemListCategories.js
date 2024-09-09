import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import Search from "../components/Search";
import ProductItem from "../components/ProductItem";

const ItemListCategories = ({ route }) => {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  const { category } = route.params;
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setProductsFiltered(products);
    }
  }, [category, isSuccess]);

  const onSearch = (input) => {
    if (!input) {
      setProductsFiltered(
        productsFiltered.filter((product) => product.category === category)
      );
    } else {
      setProductsFiltered(
        products.filter((product) =>
          product.title.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
    if (isLoading) return <View>Cargando...</View>;
    if (isError) return <View>{error.message}</View>;
  };
  return (
    <View>
      <Header title={category} />
      <Search onSearch={onSearch} />

      <FlatList
        data={productsFilteredByCategory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({});
