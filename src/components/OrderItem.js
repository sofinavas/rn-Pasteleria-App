import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const OrderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.date}>
          {new Date()}(item.createdAt).toLocaleDateString()
        </Text>
        <Text style={styles.total}> Total: $ {item.total}</Text>
      </View>
      <AntDesign name="search1" size={24} color="black" />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
