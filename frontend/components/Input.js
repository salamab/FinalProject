import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "purple",
    marginVertical: 10,
    width: "100%",
    textAlign: "center"
  }
});

export default Input;
