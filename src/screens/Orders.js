import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "../data/orders.json";
import OrderItem from "../components/OrderItem";

const Orders = () => {
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
