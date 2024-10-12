import { StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Feather name="trash" size={24} color="black" />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
