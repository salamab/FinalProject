import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d5a8d2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 18,
    width: 200
  },
  buttonText: {
    color: "white",
    // fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "left"
  }
});

export default MainButton;
