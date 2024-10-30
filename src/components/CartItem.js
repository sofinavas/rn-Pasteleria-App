import { StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../global/colors";

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <Feather name="trash" size={24} color="white" />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container:{
    width: '90%',
    marginHorizontal: "5%",
    backgroundColor: colors.greyLight,
    marginVertical: 10,
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderRadius: 10
  },
  containerText:{
    width: "70%",
    gap:5
  },
  title: {
    color: "white",
    fontSize: 19,
    fontFamily: "Playwright"
  },
  category:{
    color: colors.whiteTransparent,
    fontSize: 10
  },
  price:{
    color: colors.whiteTransparent,
    fontSize: 20,
    fontWeight: "bold"
  }
});
