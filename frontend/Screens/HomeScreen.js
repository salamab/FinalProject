import React from "react";
import { View, Text, StyleSheet, Image, Button, StatusBar } from "react-native";
import MainButton from "../components/MainButton";
import { SafeAreaView } from 'react-navigation';
SafeAreaView.setStatusBarHeight(0);
import LinearGradient from 'react-native-linear-gradient';


const HomeScreen = props => {
  
  return (
    
    // <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>



  <View style={styles.screen}>

    <StatusBar
                    // backgroundColor="#460BAC"
                    // barStyle="light-content"
                    backgroundColor = "#460BAC"
                     hidden={true}
                />
        <View>
    <Text style={{fontStyle: 'italic', color: 'white', fontWeight: '200', fontSize: 40, marginTop: 200 }}>
    LangTutor
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
              props.navigation.navigate({ routeName: "login" });
            }}
          >
        <Text>Login</Text>
          </MainButton>
      </View>
      
    </View>
    // </LinearGradient>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#4B44AD'
    
  },
  Container: {
  flexGrow: 1,
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: 100,
    // paddingTop: 300,
    alignItems: 'center',
    
  }
  // linearGradient: {
  //   flex: 1,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderRadius: 5
  // }
  
});
export default HomeScreen;
