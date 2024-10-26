import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../global/colors";

const ProductItem = ({ product }) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { id:product.id })}
    >
      <Text
        style={[styles.title, width < 300 ? styles.titleMin : styles.titleMax]}
      >
        {product.title}
      </Text>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: product.thumbnail }}
      />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "left",
    borderRadius: 10,
    backgroundColor: colors.whiteTransparentLight,
  },

  title: {
    fontWeight: "bold",
    fontFamily: "MontserratBold",
    width: "70%",
  },
  titleMax: {
    fontSize: 20,
  },
  titleMin: {
    fontSize: 14,
  },
  image: {
    minWidth: 80,
    width: "25vw",
    maxWidth: 150,
    maxHeight: 150,
    minHeight: 80,
    height: "25vw",
    borderRadius: 10,
  },
});
