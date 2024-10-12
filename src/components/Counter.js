import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Counter = () => {
  const { input, setInput } = useState(0);
  const handleInput = (t) => {
    setInput(Number(t));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCounter}>
        <Pressable
          onPress={() => console.log("va a restar")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <View style={styles.count}>
          <Text>holis</Text>
        </View>
        <Pressable
          onPress={() => console.log("va a sumar")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={String(input)}
          onChangeText={handleInput}
        />
        <Pressable
          onPress={() => console.log("suma monto")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
  },
});
