import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import ItemDetail from "./src/screens/ItemDetail";
import ItemListCategories from "./src/screens/ItemListCategories";
import { useState } from "react";
import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts";

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const [productDetailId, setProductDetailId] = useState(null);
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }
  const handleCategorySelected = (category) => {
    setCategorySelected(category);
  };
  const handleProductDetailId = (id) => {
    setProductDetailId(id);
  };

  return (
    <>
      {categorySelected ? (
        productDetailId !== null ? (
          <ItemDetail id={productDetailId} />
        ) : (
          <ItemListCategories
            category={categorySelected}
            handleProductDetailId={handleProductDetailId}
            handleCategorySelected={handleCategorySelected}
          />
        )
      ) : (
        <Home handleCategorySelected={handleCategorySelected} />
      )}

      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
