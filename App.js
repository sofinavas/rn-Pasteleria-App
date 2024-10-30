import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "./src/global/colors";
import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { init } from "./src/db";





export default function App() {

  init()
  .then(()=> console.log("DB inicializada"))
  .catch(err => {
    console.log("Initialization DB failed:");
    console.log(err.message)
  })

  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
      <StatusBar style="light" backgroundColor={colors.fucsia} />
    </>
  );
}

const styles = StyleSheet.create({});
