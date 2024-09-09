import { StyleSheet, View } from "react-native";

import Categories from "../components/Categories";
import Counter from "../components/Counter";

const Home = () => {
  return (
    <View style={styles.container}>
      <Counter />
      <Categories />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
