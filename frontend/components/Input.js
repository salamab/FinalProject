import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    // width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "purple",
    // marginVertical: 10,
    textAlign: "left"
  }
});

export default Input;
