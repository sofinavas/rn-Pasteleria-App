import { Pressable, StyleSheet, Text, View } from "react-native";
import ShadowWrapper from "./ShadowWrapper";
import { colors } from "../global/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = ({ title, handleCategorySelected }) => {
  return (
    <ShadowWrapper style={styles.container}>
      {handleCategorySelected && (
        <Pressable
          style={styles.icon}
          onPress={() => handleCategorySelected("")}
        >
          <AntDesign name="back" size={24} color="black" />
        </Pressable>
      )}

      <Text style={styles.text}>{title}</Text>
    </ShadowWrapper>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    height: 80,

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
  icon: {
    position: "absolute",
    left: 25,
  },
});
