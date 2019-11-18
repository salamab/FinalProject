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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 300,
    height: 50,
    marginVertical: 5
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: 'center',
    padding: 10
  }
});
export default MainButton;
