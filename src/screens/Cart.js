import { FlatList, StyleSheet, Text, View } from "react-native";
import cart from "../data/cart.json";
import CartItem from "../components/CartItem";

const Cart = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.containerConfirm}>
        <Text style={styles.textConfirm}>Confirmar</Text>
        <Text style={styles.textConfirm}>Total: $ {cart.total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
