import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import Header from '../components/Header';
import Orders from '../screens/Orders';
import OrderDetail from '../screens/OrderDetail';

const Stack = createNativeStackNavigator();

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(
        ()=> {
          return{
            header: ()=> <Header title= "Órdenes"/>
          }
        }
      )}
      >
      <Stack.Screen name="Orders" component={Orders}/>
      <Stack.Screen name = 'OrderDetail' component={OrderDetail}/>
       </Stack.Navigator> 
    )}

export default OrdersStack;

const styles = StyleSheet.create({});
