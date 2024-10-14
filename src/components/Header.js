import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../global/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    width: "100%",
    marginTop: 70,
    marginBottom: 20,
    height: 70,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Playwright",
  },
});
