import { FlatList, StyleSheet, Text, View } from "react-native";
import {useEffect} from "react";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../services/shop";
import LoadingSpinner from "../components/LoadingSpinner";

const Orders = () => {
  const localId = useSelector(state => state.auth.localId);
  const { data, isLoading, isSuccess, isError, error } = useGetOrdersByUserQuery(localId);

  if (isLoading) return <LoadingSpinner />;

  useEffect(() => {
    if (isSuccess) {
      console.log('Data received:', data); // Log the complete data structure
    } else if (isError) {
      console.log('Error:', error);
    }
  }, [data, isSuccess, isError]);

  if (!data) {
    return <Text>No data received</Text>;
  }

  return (
    <View>
      <FlatList
        data={data.orders} // Assuming the data is nested under 'orders'
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
