import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../global/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleInputChange = (t) => {
    setInput(t);
  };

  const handleRemoveInput = () => {
    setInput("");
    onSearch("");
    setError("");
  };

  const searchProducts = () => {
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(input)) {
      setError("");
      onSearch(input);
    } else {
      setError("Ingresa solo letras por favor");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="¿Algo especial en mente?"
          placeholderTextColor="grey"
          value={input}
          onChangeText={handleInputChange}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={searchProducts}>
            <AntDesign name="search1" size={26} color={colors.fucsia} />
          </Pressable>
          <Pressable onPress={handleRemoveInput}>
            <MaterialIcons name="cancel" size={26} color={colors.mainDark} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,

    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "70%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "15%",
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "poppins-regular",

    fontWeight: "bold",
  },
});
