import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
// import HomeScreen from "./Screens/HomeScreen";
// import StudentSignUp from "./Screens/StudentSignUp";
import ScreenNavigator from "./navigation/ScreenNavigator";
import { createAppContainer } from "react-navigation";
const AppContainer = createAppContainer(ScreenNavigator);

export default function App() {

  return <AppContainer />;

  // <View style={styles.screen}>
  //   <Header title="The best way to find a qualified teacher" />
  // <HomeScreen />
  //   <StudentSignUp />
  // </View>
}

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1
//   }
// });
