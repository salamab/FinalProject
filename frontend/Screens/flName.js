import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

const flName = props => {
  return (
    <View>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Input placeholder="First Name"></Input>
          <Input placeholder="Last Name"></Input>
        </View>
      </View>
      <View>
        <MainButton
          style={styles.nextButton}
          onPress={() => {
            props.navigation.navigate({ routeName: "logInpage" });
          }}
        >
          Next
        </MainButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 200,
    alignItems: "center"
  },
  nextButton: {
    marginTop: 50
  }
});
export default flName;
