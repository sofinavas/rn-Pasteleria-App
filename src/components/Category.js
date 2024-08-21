import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ShadowWrapper from "./ShadowWrapper";
import { colors } from "../global/colors";

const Category = ({ item, handleCategorySelected }) => {
  return (
    <Pressable onPress={() => handleCategorySelected(item)}>
      <ShadowWrapper style={styles.container}>
        <Text style={styles.text}>{item}</Text>
      </ShadowWrapper>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTransparentLight,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
