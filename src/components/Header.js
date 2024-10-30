import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../db";
import { clearUser } from "../features/auth/authSlice";
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = ({ title }) => {

  const dispatch= useDispatch()
  const idToken = useSelector(state=> state.auth.idToken)

  const onLogout = () =>{
    deleteSession()
    dispatch(clearUser())
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {idToken &&
      <Pressable onPress={onLogout} style={styles.logout} >
      <AntDesign name="logout" size={24} color="black" />
      </Pressable>
      }
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    width: "100%",
    marginTop: 80,
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
  icon:{
    position:"absolute",
    left: 20
  },
  logout: {
    position:"absolute",
    right:20,
    bottom:20
  }
});
