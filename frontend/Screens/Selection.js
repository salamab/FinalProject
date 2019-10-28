import React from "react";
import { View, StyleSheet, Button } from "react-native";
import MainButton from "../components/MainButton";

const Selection = props => {
  console.log(props);
  return (
    <View style={styles.buttonContainer}>
      <View>
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "flName" });
            }}
          >
            I am a student
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "flName" });
            }}
          >
            I am a teacher
          </MainButton>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },

  buttonContainer: {
    width: "70%",
    margin: 30,
    alignItems: "center"
    // paddingLeft: 20
  }
});
export default Selection;
