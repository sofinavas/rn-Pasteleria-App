import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../global/colors";

const TabBarIcon = ({ text, icon, focused }) => {
  return (
    <View style={styles.container}>
      <Entypo
        name={icon}
        size={24}
        color={focused ? colors.fucsia : colors.whiteTransparent}
      />
      <Text
        style={{ color: focused ? colors.fucsia : colors.whiteTransparent }}
      >
        {text}
      </Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
  },
});
