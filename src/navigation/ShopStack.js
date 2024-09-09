import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";

import ItemDetail from "../screens/ItemDetail";
import ItemListCategories from "../screens/ItemListCategories";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        return {
          header: () => (
            <Header
              title={
                route.name === "Home"
                  ? "La Paste de Lucy"
                  : route.name === "Products"
                  ? route.params.category
                  : "Detalle del Producto"
              }
            />
          ),
        };
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={ItemDetail} />
      <Stack.Screen name="Detail" component={ItemListCategories} />
    </Stack.Navigator>
  );
};

export default ShopStack;

const styles = StyleSheet.create({});
