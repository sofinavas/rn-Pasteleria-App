import { FlatList, StyleSheet, Text, View } from "react-native";

import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../services/shop";
import LoadingSpinner from "../components/LoadingSpinner";

const Orders = () => {
  const localId = useSelector(state => state.auth.localId);
  const { data:orders = [], isLoading, isError, error } = useGetOrdersByUserQuery(localId);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    console.log("Error fetching orders:", error);
    return <Text>Error al cargar las órdenes</Text>;
  }

if (orders.length === 0) return <View><Text>Vacío</Text></View>


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
