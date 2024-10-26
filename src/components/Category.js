import { Pressable, StyleSheet, Text, View } from "react-native";

import ShadowWrapper from "./ShadowWrapper";
import { colors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

const Category = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Products", { category: item })}
    >
      <ShadowWrapper style={styles.container}>
        <Text style={styles.text}>{item}</Text>
      </ShadowWrapper>
    </Pressable>
  );
};





export default Category;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.fucsia,
    width: "80%",
    marginHorizontal: "10%",
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "Playwright"
  },
});
