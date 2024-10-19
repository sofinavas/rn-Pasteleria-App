import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import Header from '../components/Header';
import Orders from '../screens/Orders';

const Stack = createNativeStackNavigator();

const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          header: () => <Header title="Órdenes" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;

const styles = StyleSheet.create({});
