import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import MainButton from "../components/MainButton";

  const Selection = props => {
  console.log(props);
  return (
    <View style={styles.buttonContainer}>
      
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate("addnewuser", { role: "Student" });
            }}
          >
            I am here to learn
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate("addnewuser", { role: "Teacher" });
            }}
          >
            I am here to teach
          </MainButton>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
  flex: 1
  },
  button:{
    backgroundColor: '#460BAC'
  }

});
export default Selection;
