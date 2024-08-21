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
import products from "../data/products.json";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";

const ItemListCategories = ({
  category,
  handleCategorySelected,
  handleProductDetailId,
}) => {
  const [productsFilteredByCategory, setProductsFilteredByCategory] = useState(
    []
  );

  useEffect(() => {
    setProductsFilteredByCategory(
      products.filter((product) => product.category === category)
    );
  }, [category]);
  const onSearch = (input) => {
    if (!input) {
      setProductsFilteredByCategory(
        products.filter((product) => product.category === category)
      );
    } else {
      setProductsFilteredByCategory(
        productsFilteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  };
  return (
    <SafeAreaView>
      <Header
        title={category}
        handleCategorySelected={handleCategorySelected}
      />
      <Search onSearch={onSearch} />

      <FlatList
        data={productsFilteredByCategory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            handleProductDetailId={handleProductDetailId}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({});
