import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import OrdersStack from "./OrdersStack";
import TabBarIcon from "../components/TabBarIcon";
const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={ShopStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} text="Shop" icon="shop" />;
            },
          }}
        />

        <Tab.Screen
          name="CartStack"
          component={CartStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon
                  focused={focused}
                  text="Carrito"
                  icon="shopping-cart"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="OrdersStack"
          component={OrdersStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon focused={focused} text="Ordenes" icon="list" />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    height: 60,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
  },
});
