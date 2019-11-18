import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const authenticateUser = controller => async (req,res,next)=>{

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Enter Email"
            // onPress={() => {
            //   props.navigation.navigate();
            // }}
          />
        </View>
        <View style={styles.button}>
          <Button title="Enter Password" />
        </View>
      </View>
      <View>
        <Text>Enter your phone Number to send you a verification code</Text>
      </View>

      <View>
        <Button
          title="Login"
          onPress={() => {
            props.navigation.navigate({ routeName: "selectlanguage" });
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },

  buttonContainer: {
    flexDirection: "column",
    width: "80%",
    padding: 20
  },
  button: {
    width: 200,
    padding: 10,
    borderRadius: 100
  }
});
export default logInpage;
