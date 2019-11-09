import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import MainButton from "../components/MainButton";

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/splashImage.jpg")}
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "selection" });
            }}
          >
            Sign Up
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "selection" });
            }}
          >
            Sign In
          </MainButton>
        </View>
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
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  imageContainer: {
    width: "100%",
    height: 300
  },
  image: {
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    flexDirection: "column",
    width: "80%",
    padding: 20
  },
  button: {
    padding: 10
  }
});
export default HomeScreen;
