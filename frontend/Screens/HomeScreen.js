import React from "react";
import { View, Text, StyleSheet, Image, Button, StatusBar } from "react-native";
import MainButton from "../components/MainButton";
import { SafeAreaView } from 'react-navigation';
SafeAreaView.setStatusBarHeight(0);
const HomeScreen = props => {
  return (
    
    <View style={styles.screen}>
        <View>
    <Text style={{fontStyle: 'italic', color: 'white', fontWeight: 'bold', fontSize:  }}>
    My Teacher
      </Text>
    </View>
      <View style={styles.Container}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "selection" });
            }}
          >
        <Text> Register </Text>
          </MainButton>
        
        <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "selection" });
            }}
          >
        <Text>Login</Text>
          </MainButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#460BAC'
  },
  Container: {
  flexGrow: 1,
    flexDirection: "column",
    justifyContent: 'center',
    paddingTop: 300,
    alignItems: 'center'
  }
});
export default HomeScreen;
